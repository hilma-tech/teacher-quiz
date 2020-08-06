// let { Model } = require('sequelize');
const fOpenapi = require('../openApi.json');

let cmOpenapi = fOpenapi;

module.exports = {
    createDefCrud,
    creatingCustomMethod,
    cmOpenapi
}


async function createDefCrud(app) {
    const cName = this.name.toLowerCase();

    app.route(`/${cName}`)
        .get(async (req, res) => {
            const [sCode, data] = await resStatus(async () =>
                await this.findAll({ where: req.query })

            )
            return res.status(sCode).send(data);
        })
        .post(async (req, res) => {
            const [sCode, data] = await resStatus(async () => await this.create(req.body))
            return res.status(sCode).send(data);
        })

    app.route(`/${cName}/:id`)
        .get(async (req, res) => {
            const { id } = req.params;
            const [sCode, data] = await resStatus(async () => await this.findByPk(id));
            return res.status(sCode).send(data);
        })
        .delete(async (req, res) => {
            const { id } = req.params;
            const [sCode, data] = await resStatus(async () => await this.destroy({ where: { id } }));
            return res.status(sCode).send(data);
        })
        .put(async (req, res) => {
            const { id } = rereq.params;
            const [sCode, data] = await resStatus(async () => await this.update(req.body, { where: { id } }));
            return res.status(sCode).send(data);
        })

    cmOpenapi.components.schemas = { ...cmOpenapi.components.schemas, ...basicSchemas.call(this) }
    cmOpenapi.paths = { ...cmOpenapi.paths, ...defCrudOpenapi.call(this) }
}

async function creatingCustomMethod(app) {
    const { routes, schemas } = this;
    if (!routes && !schemas) return;

    let { paths: pathsOA } = cmOpenapi;
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
                    const [sCode, data] = await resStatus(async () => await this[method](req));
                    return res.status(sCode).send(data);
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

            cmOpenapi.paths = pathsOA;
            cmOpenapi.components.schemas = {
                ...cmOpenapi.components.schemas,
                ...schemas
            };

        }
    }
}

async function resStatus(cb) {
    try {
        const data = await cb();
        return [200, data];
    }
    catch (err) {
        console.log('err in res status', err)
        return [400];
    }
}

function basicSchemas() {
    const att = this.rawAttributes;
    let properties = {}, fields = {};

    for (const prop in att) {
        properties[prop] = { type: att[prop].type.key.toLowerCase() };
        fields[prop] = { type: 'boolean' };
    }

    return {
        [this.name.toLowerCase()]: {
            type: 'object',
            properties: JSON.stringify(properties)
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
                JSON.stringify(fields)
        }
    }
}

function defCrudOpenapi() {
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






// class CustomModel extends Model {

//     constructor() { super(); }

//     static cmOpenapi = fOpenapi;
//     static cmRoutes = [];

//     static async createDefCrud(app) {
//         const cName = this.name.toLowerCase();
//         let { cmOpenapi } = this;

//         app.route(`/${cName}`)
//             .get(async (req, res) => {
//                 const [sCode, data] = await resStatus(async () =>
//                     await this.findAll({ where: req.query, raw: true })

//                 )
//                 return res.status(sCode).send(data);
//             })
//             .post(async (req, res) => {
//                 // console.log('im hereee',req)
//                 const [sCode, data] = await resStatus(async () => await this.create(req.body, { raw: true }))
//                 return res.status(sCode).send(data);
//             })

//         app.route(`/${cName}/:id`)
//             .get(async (req, res) => {
//                 const { id } = req.params;
//                 const [sCode, data] = await resStatus(async () => await this.findByPk(id, { raw: true }));
//                 return res.status(sCode).send(data);
//             })
//             .delete(async (req, res) => {
//                 const { id } = req.params;
//                 const [sCode, data] = await resStatus(async () => await this.destroy({ where: { id }, raw: true }));
//                 return res.status(sCode).send(data);
//             })
//             .put(async (req, res) => {
//                 const { id } = rereq.params;
//                 const [sCode, data] = await resStatus(async () => await this.update(req.body, { where: { id }, raw: true }));
//                 return res.status(sCode).send(data);
//             })

//         cmOpenapi.components.schemas = { ...cmOpenapi.components.schemas, ...this.basicSchemas }
//         cmOpenapi.paths = { ...cmOpenapi.paths, ...this.defCrudOpenapi }
//     }

//     static async creatingCustomMethod(app) {
//         const { routes, schemas } = this;
//         if (!routes && !schemas) return;

//         let { paths: pathsOA } = cmOpenapi;
//         const cName = this.name.toLowerCase();

//         const existRoutes = [];
//         if (app._router) {
//             for (let middleware of app._router.stack) {
//                 if (!middleware.route) continue;
//                 const { route } = middleware;
//                 existRoutes.push({ op: Object.keys(route.methods), path: route.path })
//             }
//         }

//         for (let path in routes) {
//             const registeredOp = routes[path];
//             path = `/${cName}${path}`;

//             for (const { method, op, ...other } of registeredOp) {

//                 let ifRouteExist = existRoutes
//                     .some(({ op: eOp, path: ePath }) => eOp === op && ePath === path);

//                 if (!ifRouteExist) {
//                     //creating route
//                     const rPath = path.replace(/[{()}]/g, '');

//                     app[op](rPath, async (req, res, next) => {
//                         const [sCode, data] = await resStatus(async () => await this[method](req));
//                         return res.status(sCode).send(data);
//                     });

//                 } else { console.log('route already exist') }

//                 //creating openapi info for this route
//                 const oaPath = path.replace(':', '');

//                 if (pathsOA.hasOwnProperty(oaPath)
//                     && pathsOA[oaPath].hasOwnProperty(op)) continue;

//                 if (!other.tags) other.tags = [cName];
//                 if (!other.responses) {
//                     other.responses = {
//                         200: {
//                             description: `default response in class ${cName}`,
//                             content: {
//                                 'application/json': {
//                                     schema: { $ref: `#/components/schemas/${cName}` }
//                                 }
//                             }
//                         }
//                     }
//                 }

//                 if (!pathsOA[oaPath]) pathsOA[oaPath] = {};
//                 pathsOA[oaPath][op] = other;

//                 cmOpenapi.paths = pathsOA;
//                 cmOpenapi.components.schemas = {
//                     ...cmOpenapi.components.schemas,
//                     ...schemas
//                 };

//             }
//         }
//     }

//     static get basicSchemas() {
//         const att = this.rawAttributes;
//         let properties = {}, fields = {};

//         for (const prop in att) {
//             properties[prop] = { type: att[prop].type.key.toLowerCase() };
//             fields[prop] = { type: 'boolean' };
//         }

//         return {
//             [this.name.toLowerCase()]: {
//                 type: 'object',
//                 properties: JSON.stringify(properties)
//             },
//             [`filter${this.name}`]: {
//                 allOf: [
//                     {
//                         $ref: "#/components/schemas/basicFilter"
//                     },
//                     {
//                         type: "object",
//                         properties: {
//                             fields: {
//                                 $ref: `#/components/schemas/${this.name}.fields`
//                             }
//                         }
//                     }
//                 ]
//             },
//             [`${this.name}.fields`]: {
//                 type: 'object',
//                 properties:
//                     JSON.stringify(fields)
//             }
//         }
//     }

//     static get defCrudOpenapi() {
//         const cName = this.name.toLowerCase();

//         return {
//             [`/${cName}`]: {
//                 get: {
//                     tags: [cName],
//                     parameters: [
//                         {
//                             name: "query",
//                             in: "query",
//                             schema: {
//                                 $ref: `#/components/schemas/filter${this.name}`
//                             }
//                         }
//                     ],
//                     responses: {
//                         200: {
//                             description: `A list of ${cName}`,
//                             content: {
//                                 'application/json': {
//                                     schema: { $ref: `#/components/schemas/${cName}` }
//                                 }
//                             }
//                         }
//                     }
//                 },
//                 post: {
//                     tags: [cName],
//                     requestBody: {
//                         content: {
//                             "application/json": {
//                                 schema: {
//                                     $ref: `#/components/schemas/${cName}`
//                                 }
//                             }
//                         },
//                         required: true
//                     },
//                     responses: {
//                         200: {
//                             description: `create new one ${cName}`,
//                             content: {
//                                 'application/json': {
//                                     schema: { $ref: `#/components/schemas/${cName}` }
//                                 }
//                             }
//                         }
//                     }
//                 }
//             },

//             [`/${cName}/{id}`]: {
//                 get: {
//                     tags: [cName],
//                     parameters: [
//                         {
//                             name: "id",
//                             in: "path",
//                             required: true,
//                             schema: {
//                                 type: 'integer'
//                             }
//                         },
//                         {
//                             name: 'query',
//                             in: 'query',
//                             schema: {
//                                 $ref: `#/components/schemas/filter${this.name}`
//                             }
//                         }
//                     ],
//                     responses: {
//                         200: {
//                             description: `get specific ${cName}`,
//                             content: {
//                                 'application/json': {
//                                     schema: { $ref: `#/components/schemas/${cName}` }
//                                 }
//                             }
//                         }
//                     }
//                 },

//                 put: {
//                     tags: [cName],
//                     parameters: [
//                         {
//                             name: "id",
//                             in: "path",
//                             required: true,
//                             schema: { type: "integer" }
//                         }
//                     ],
//                     requestBody: {
//                         content: {
//                             "application/json": {
//                                 schema: {
//                                     $ref: `#/components/schemas/${cName}`
//                                 }
//                             }
//                         },
//                         required: true
//                     },
//                     responses: {
//                         200: {
//                             description: `update specific ${cName}`,
//                             content: {
//                                 'application/json': {
//                                     schema: { $ref: `#/components/schemas/${cName}` }
//                                 }
//                             }
//                         }
//                     }
//                 },

//                 delete: {
//                     tags: [cName],
//                     parameters: [
//                         {
//                             name: "id",
//                             in: "path",
//                             required: true,
//                             schema: {
//                                 type: "integer"
//                             }
//                         }
//                     ],
//                     responses: {
//                         200: {
//                             description: `delete specific ${cName}`,
//                             content: {
//                                 'application/json': {
//                                     schema: { $ref: `#/components/schemas/${cName}` }
//                                 }
//                             }
//                         }
//                     }
//                 }
//             }

//         }
//     }
// }

// module.exports = CustomModel;

