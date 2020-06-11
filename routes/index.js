const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const express = require('express');


module.exports = (app) => {
  fs
    .readdirSync(__dirname)
    .filter(fName => {
      return (fName.indexOf('.') !== 0) && (fName !== basename) && (fName.slice(-3) === '.js');
    })
    .map(fName => {
      let router = express.Router();
      fName = fName.replace(/\.[^/.]+$/, "");
      const mName = fName.charAt(0).toUpperCase() + fName.slice(1);
      const Model = require('../models')[mName];

      // defaultCrud(Model);
      require(`./${fName}`)(router, Model);
      return app.use(`/${fName}`, router);
    });
};


async function defaultCrud1(router, Model) {

  /* GET users listing. */
  router.get('/', async (req, res, next) => {
    const elements = await Model.findAll();
    res.send(elements);
  });

  router.get('/:id', async (req, res, next) => {
    const { id } = req.params
    const elenemt = await Model.findAll({ where: { id } });
    res.send(elenemt);
  });

  router.post('/', async (req, res, next) => {
    const c = await Model.create(req.body)
    res.send(c);
  });

  router.put('/:id', async (req, res, next) => {
    const { id } = req.params
    const up = await Model.update(req.body, { where: { id } })
    res.send(up);
  });


  router.delete('/:id', async (req, res, next) => {
    const { id } = req.params
    const del = await Model.destroy({ where: { id } })
    res.send(del);
  });

  return router;
}


function customMethods(router, Model) {
  const { routes, compSchemes, tags } = Model;
  let openapi = JSON.parse(JSON.stringify(require('../openApi.json')));

  let { paths: pathsOA, components: compOA } = openapi;

  for (const path in routes) {
    for (const info of routes[path]) {
      compOA.schemas = { ...compOA.schemas, ...compSchemes };

      if (Object.keys(pathsOA).includes(path)) break;

      const { method, op, ...reqParams } = info;

      const pObj = {
        [path]: {
          [op]: {
            tags,
            reqParams
          }
        }
      }

      pathsOA = { ...pathsOA, ...pObj };

      router[op](path, async (req, res, next) => {
        const result = Model[method](req);
        res.send(result);
      });

    }
  }
}
// customMethods()
