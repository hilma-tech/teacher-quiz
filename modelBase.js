let { Model } = require('sequelize');
const openapi = require('./openApi.json');
const all_routes = require('express-list-endpoints');


class CustomModel extends Model {

    constructor() {
        super()
    }

    static createDefCrud(app) {
        const cName = this.name.toLowerCase();
        let { paths, components, tags } = openapi;

        app.route(`/${cName + 's'}`)
            .get(async (req, res) => {
                const elements = await this.findAll(req.query);
                res.send(elements)
            })
            .post(async (req, res) => {
                const newEl = await this.create(req.body);
                res.send(newEl);
            })

        app.route(`/${cName + 's'}/:id`)
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

        tags.push({ name: this.cName })

        const basicSchema = createBasicSchema();
        components.schemas = { ...components.schemas, ...basicSchema }


        console.log(all_routes(app));



    }


    static utiles = {
        addRoute,
        addSchema,
        createDefCrudRoutes
    }

    get = async (req) => {
        return await this.findAll(req.query);
    }

    getById = async (req) => {
        const { id } = req.params
        return await this.findByPk(id);
    }

    createNewInst = async (req) => {
        return await this.create(req.body);
    }

    updateInst = async (req) => {
        const { id } = rereq.params
        return await this.update(req.body, { where: { id } });
    }

    deleteInst = async (req) => {
        const { id } = req.params
        return await this.destroy({ where: { id } });
    }
}

class Lala extends CustomModel { };

// let lala = new Lala();
// Lala.init({
//     id: {
//         type: '',
//         autoIncrement: true,
//         primaryKey: true,
//         allowNull: false
//     }
// }, {
//     // Other model options go here
//     sequelize, // We need to pass the connection instance
//     modelName: 'Challenges', // We need to choose the model name
//     tableName: 'challenges'
// });


// Lala.createDefCrud();
console.log('rawAttributes', Lala.rawAttributes)

module.exports = CustomModel;

function addSchema(newSchemes) {
    if (!Model.schemas) Model.schemas = createBasicSchema();
    Model.components.schemas = { ...MoModel.components.schemasdel, ...newSchemes };
}

function addRoute(newRoutes, Model) {
    if (!Model.routes) Model.routes = defCrudRoutes;
    Model.paths = { ...Model.paths, ...newRoutes };
}

function createDefCrudRoutes() {
    if (!Model.routes) Model.routes = defCrudRoutes;
    if (!Model.schemas) Model.schemas = createBasicSchema();
}

function createBasicSchema() {
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



const defCrudRoutes = {
    '/': [{
        method: "get",
        op: 'get'
    },
    {
        method: "createNewInst",
        op: 'post',
        requestBody: {
            schema: {
                $ref: `#/components/schemas/${Model.name.toLowerCase()}`
            }
        }
    }],

    '/{id}': [{
        method: "getById",
        op: 'get',
        parameters: [
            {
                name: 'id',
                in: "path",
                required: true,
                schema: {
                    type: 'integer'
                }
            }
        ],
    },
    {
        method: "deleteInst",
        op: 'delete',
        parameters: [
            {
                name: 'id',
                in: "path",
                required: true,
                schema: {
                    type: 'integer'
                }
            }
        ],
    },
    {
        method: "updateInst",
        op: 'put',
        requestBody: {
            schema: {
                $ref: `#/components/schemas/${Model.name.toLowerCase()}`
            }
        }
    }
    ]
}