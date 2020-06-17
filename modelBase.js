let { Model } = require('sequelize');
const openapi = require('./openApi.json');
const fs = require('fs');

class CustomModel extends Model {

    constructor() {
        super();
        this.cName = this.name.toLowerCase();
    }

    static async createDefCrud(app) {
        const cName = this.name.toLowerCase();

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

        const basicSchema = this.createBasicSchema();
        const opeapiPaths = {
            [`/${cName}`]: {
                get: {
                    tags: [cName],
                    parameters: [
                        {
                            name: "query",
                            in: "query",
                            schema: {
                                type: "obj"
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

            [`${cName}/:{id}`]: {
                get: {
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

        openapi.components.schemas = { ...openapi.components.schemas, ...basicSchema }
        openapi.paths = { ...openapi.paths, ...opeapiPaths }

        try { fs.writeFileSync('./openApi.json', JSON.stringify(openapi, null, 2), 'utf8'); }
        catch (err) { console.log('err in json', err) }
    }

    static createBasicSchema() {
        const att = this.rawAttributes;
        let properties = {};

        for (const prop in att) {
            properties[prop] = { type: att[prop].type.key.toLowerCase() };
        }

        return {
            [this.name.toLowerCase()]: {
                type: 'object',
                properties
            }
        }
    }


    static async creatingCustomMethod(app) {
        const { routes, schemas } = this;
        if (!routes && !schemas) return;

        let { paths: pathsOA } = openapi;
        const cName = this.name.toLowerCase();

        const existRoutes = [];
        for (let middleware of app._router.stack) {
            if (!middleware.route) continue;
            const { route } = middleware;
            existRoutes.push({ op: Object.keys(route.methods), path: route.path })
        }

        for (let path in routes) {
            const registeredOp = routes[path];
            path = `/${cName}${path}`;

            for (const { method, op, ...other } of registeredOp) {

                let ifRouteExist = existRoutes
                    .some(({ op: eOp, path: ePath }) => eOp === op && ePath === path);

                if (!ifRouteExist) {
                    //creating route
                    let rPath = path.replace(/[{()}]/g, '');

                    app[op](rPath, async (req, res, next) => {
                        const result = this[method](req);
                        res.send(result);
                    });
                } else { console.log('route already exist') }

                //creating openapi info for this route
                if (pathsOA.hasOwnProperty(path)
                    && pathsOA[path].hasOwnProperty(op)) continue;

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

                if (!pathsOA[path]) pathsOA[path] = {};
                pathsOA[path][op] = other;

                openapi.components.schemas = { ...openapi.components.schemas, ...schemas };
                openapi.paths = pathsOA;

                try { await fs.writeFileSync('./openApi.json', JSON.stringify(openapi, null, 2), 'utf8'); }
                catch (err) { console.log('err in json', err) }
            }
        }
    }
}

module.exports = CustomModel;
