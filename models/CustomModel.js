let { Model } = require('sequelize');
const fOpenapi = require('../openApi.json');

class CustomModel extends Model {

    constructor() { super(); }

    static cmOpenapi = fOpenapi;
    static cmRoutes = [];

    static async createDefCrud(app) {
        const cName = this.name.toLowerCase();
        let { cmOpenapi } = this;

        app.route(`/${cName}`)
            .get(async (req, res) => {
                const elements = await this.findAll(req.query);
                res.send(elements)
            })
            .post(async (req, res) => {
                const newEl = await this.create(req.body);
                res.send(newEl);
            })

        app.route(`/${cName}/:id`)
            .get(async (req, res) => {
                const { id } = req.params
                const el = await this.findByPk(id);
                res.send(el);
            })
            .delete(async (req, res) => {
                const { id } = req.params
                const delEl = await this.destroy({ where: { id } });
                res.send(delEl);
            })
            .put(async (req, res) => {
                const { id } = rereq.params
                const upEl = await this.update(req.body, { where: { id } });
                res.send(upEl);
            })

        cmOpenapi.components.schemas = { ...cmOpenapi.components.schemas, ...this.basicSchemas }
        cmOpenapi.paths = { ...cmOpenapi.paths, ...this.defCrudOpenapi }
    }

    static async creatingCustomMethod(app) {
        const { routes, schemas } = this;
        if (!routes && !schemas) return;

        let { paths: pathsOA } = this.cmOpenapi;
        const cName = this.name.toLowerCase();

        const existRoutes = [];
        if (app._router) {
            for (let middleware of app._router.stack) {
                if (!middleware.route) continue;
                const { route } = middleware;
                existRoutes.push({ op: Object.keys(route.methods), path: route.path })
            }
        }

        for (let path in routes) {
            const registeredOp = routes[path];
            path = `/${cName}${path}`;

            for (const { method, op, ...other } of registeredOp) {

                let ifRouteExist = existRoutes
                    .some(({ op: eOp, path: ePath }) => eOp === op && ePath === path);

                if (!ifRouteExist) {
                    //creating route
                    const rPath = path.replace(/[{()}]/g, '');

                    app[op](rPath, async (req, res, next) => {
                        const result = this[method](req);
                        res.send(result);
                    });
                } else { console.log('route already exist') }

                //creating openapi info for this route
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

                this.cmOpenapi.paths = pathsOA;
                this.cmOpenapi.components.schemas = {
                    ...this.cmOpenapi.components.schemas,
                    ...schemas
                };

            }
        }
    }

    static get basicSchemas() {
        const att = this.rawAttributes;
        let properties = {}, fields = {};

        for (const prop in att) {
            properties[prop] = { type: att[prop].type.key.toLowerCase() };
            fields[prop] = { type: 'boolean' };
        }

        return {
            [this.name.toLowerCase()]: {
                type: 'object',
                properties
            },
            [`filter${this.name}`]: {
                allOf: [
                    {
                        $ref: "#/components/schemas/basicFilter"
                    },
                    {
                        type: "object",
                        properties: {
                            fields: {
                                $ref: `#/components/schemas/${this.name}.fields`
                            }
                        }
                    }
                ]
            },
            [`${this.name}.fields`]: {
                type: 'object',
                properties:
                    fields
            }
        }
    }

    static get defCrudOpenapi() {
        const cName = this.name.toLowerCase();

        return {
            [`/${cName}`]: {
                get: {
                    tags: [cName],
                    parameters: [
                        {
                            name: "query",
                            in: "query",
                            schema: {
                                $ref: `#/components/schemas/filter${this.name}`
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

            [`${cName}/{id}`]: {
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
                                $ref: `#/components/schemas/filter${this.name}`
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
}

module.exports = CustomModel;

