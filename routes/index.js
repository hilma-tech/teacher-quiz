const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const express = require('express');
const modelBase=require('../modelBase');

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
      // modelBase(Model);


      // defaultCrud(Model);
      require(`./${fName}`)(router, Model);
      return app.use(`/${fName}`, router);
    });
};



function customMethods(router, Model) {
  const { routes, schemas, tags } = Model;
  let openapi = JSON.parse(JSON.stringify(require('../openApi.json')));

  let { paths: pathsOA, components: compOA } = openapi;

  for (const path in routes) {
    for (const info of routes[path]) {
      compOA.schemas = { ...compOA.schemas, ...schemas };

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
