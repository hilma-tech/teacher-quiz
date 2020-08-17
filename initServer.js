const fOpenapi = require('./openApi.json');
const models = require('./models').sequelize.modelManager.models;
const express = require('express');
let cmOpenapi = fOpenapi;

module.exports = async function start(app) {
    for (let Model of models) {
        let router = express.Router();
        router = creatingCustomMethod(Model, router) || router;
        router = createDefCrud(Model, router);
        app.use(`/${Model.name.toLowerCase()}`, router);
    }
    return cmOpenapi;
}

function createDefCrud(Model, router) {
    router.route(`/`)
        .get(async (req, res) => {
            console.log('inside get ')
            console.log('req.query.filter): ', req.query.filter);
            await handleRes(res, async () => await Model.findAll(req.query.filter))
        })
        .post(async (req, res) =>
            await handleRes(res, async () => await Model.create(req.body))
        )

    router.route(`/:id`)
        .get(async (req, res) => {
            const { id } = req.params;
            // console.log('id: ', id);
            console.log('req.query.filter: ', req.query.filter);
            await handleRes(res, async () => await Model.findByPk(id, req.query.filter));
        })
        .delete(async (req, res) => {
            const { id } = req.params;
            await handleRes(res, async () => await Model.destroy({ where: { id } }));
        })
        .put(async (req, res) => {
            const { id } = req.params;
            await handleRes(res, async () => await Model.update(req.body, { where: { id } }));
        });

    Object.assign(cmOpenapi.components.schemas, {
        components: { schemas: basicSchemas(Model) },
        paths: defCrudOpenapi(Model)
    });
    return router;
}

function creatingCustomMethod(Model, router) {
    const { routes, schemas } = Model;
    if (!routes) return router;
    let { paths: pathsOA } = cmOpenapi;
    const cName = Model.name.toLowerCase();

    for (let path in routes) {
        const registeredOp = routes[path];

        for (const { method, op, ...other } of registeredOp) {
            const rPath = path.replace(/[{()}]/g, '');

            router[op](rPath, async (req, res, next) => {
                await handleRes(res, async () => await Model[method](req));
            });

            //creating openapi info for Model route
            const oaPath = path.replace(':', '');

            if (pathsOA.hasOwnProperty(oaPath)
                && pathsOA[oaPath].hasOwnProperty(op)) continue;

            if (!other.tags) other.tags = [cName];
            if (!other.responses) {
                other.responses = {
                    200: {
                        description: `default response in class ${cName}`,
                        content: {
                            'application/json': {
                                schema: { $ref: `#/components/schemas/${cName}` }
                            }
                        }
                    }
                }
            }

            if (!pathsOA[oaPath]) pathsOA[oaPath] = {};
            pathsOA[oaPath][op] = other;

            Object.assign(cmOpenapi.paths, pathsOA);
            Object.assign(cmOpenapi.components.schemas, schemas);
        }
    }
    return router;
}

async function handleRes(res, cb) {
    try {
        const data = await cb();
        res.status(200).send(data);
    }
    catch (err) {
        console.log('err in res status', err)
        res.status(400).send(err);
    }
}

function basicSchemas(Model) {
    const att = Model.rawAttributes;
    let properties = {}, fields = {};

    for (const prop in att) {
        properties[prop] = { type: att[prop].type.key.toLowerCase() };
        fields[prop] = { type: 'boolean' };
    }

    return {
        [Model.name.toLowerCase()]: {
            type: 'object',
            properties: JSON.stringify(properties)
        },
        [`filter${Model.name}`]: {
            allOf: [
                { $ref: "#/components/schemas/basicFilter" },
                {
                    type: "object",
                    properties: {
                        fields: {
                            $ref: `#/components/schemas/${Model.name}.fields`
                        }
                    }
                }
            ]
        },
        [`${Model.name}.fields`]: {
            type: 'object',
            properties:
                JSON.stringify(fields)
        }
    }
}

function defCrudOpenapi(Model) {
    const cName = Model.name.toLowerCase();

    return {
        [`/${cName}`]: {
            get: {
                tags: [cName],
                parameters: [
                    {
                        name: "query",
                        in: "query",
                        schema: {
                            $ref: `#/components/schemas/filter${Model.name}`
                        }
                    }
                ],
                responses: {
                    200: {
                        description: `A list of ${cName}`,
                        content: {
                            'application/json': {
                                schema: { $ref: `#/components/schemas/${cName}` }
                            }
                        }
                    }
                }
            },
            post: {
                tags: [cName],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: `#/components/schemas/${cName}`
                            }
                        }
                    },
                    required: true
                },
                responses: {
                    200: {
                        description: `create new one ${cName}`,
                        content: {
                            'application/json': {
                                schema: { $ref: `#/components/schemas/${cName}` }
                            }
                        }
                    }
                }
            }
        },

        [`/${cName}/{id}`]: {
            get: {
                tags: [cName],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: {
                            type: 'integer'
                        }
                    },
                    {
                        name: 'query',
                        in: 'query',
                        schema: {
                            $ref: `#/components/schemas/filter${Model.name}`
                        }
                    }
                ],
                responses: {
                    200: {
                        description: `get specific ${cName}`,
                        content: {
                            'application/json': {
                                schema: { $ref: `#/components/schemas/${cName}` }
                            }
                        }
                    }
                }
            },

            put: {
                tags: [cName],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "integer" }
                    }
                ],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: `#/components/schemas/${cName}`
                            }
                        }
                    },
                    required: true
                },
                responses: {
                    200: {
                        description: `update specific ${cName}`,
                        content: {
                            'application/json': {
                                schema: { $ref: `#/components/schemas/${cName}` }
                            }
                        }
                    }
                }
            },

            delete: {
                tags: [cName],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: {
                            type: "integer"
                        }
                    }
                ],
                responses: {
                    200: {
                        description: `delete specific ${cName}`,
                        content: {
                            'application/json': {
                                schema: { $ref: `#/components/schemas/${cName}` }
                            }
                        }
                    }
                }
            }
        }

    }
}
