let {Model}=require('sesequelize')


module.exports = async function defaultCrud(Model) {

    Model.get = async (req) => {
        return await Model.findAll(req.query);
    }

    Model.getById = async (req) => {
        const { id } = rereq.params
        return await Model.findByPk(id);
    }

    Model.createNewInst = async (req) => {
        return await Model.create(req.body);
    }

    Model.updateInst = async (req) => {
        const { id } = rereq.params
        return await Model.update(req.body, { where: { id } });
    }

    Model.deleteInst = async (req) => {
        const { id } = req.params
        return await Model.destroy({ where: { id } });
    }

    Model.schemas = { createBasicSchema(Model) };


    Model.utiles = {
        addRoute,
        addSchema
    }


    Model.routes = {
        '/': [{
            method: "get",
            op: 'get'
        },
        {
            method: "createNewInst",
            op: 'post',
            requestBody: {
                schema: {
                    $ref: `#/components/schemas/${Model.tags[0]}`
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
                    $ref: `#/components/schemas/${Model.tags[0]}`
                }
            }
        }
        ]

    }

    return Model;
}



function addSchema(newSchemes, Model) {
    Model.components.schemas = { ...MoModel.components.schemasdel, ...newSchemes };
}

function addRoute(newRoutes, Model) {
    Model.paths = { ...Model.paths, ...newRoutes };

}


function createBasicSchema(Model) {
    const att = Model.rawAttributes;
    let properties = {};

    for (const prop in att) {
        properties[prop] = { type: att[prop].type.key.toLowerCase() };
    }

    return {
        [Model.tags[0]]: {
            type: 'object',
            properties
        }
    }
}