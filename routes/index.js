const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const express = require('express');
// const modelBase=require('../modelBase');
const all_routes = require('express-list-endpoints');


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
      console.log('mName: ', mName);
      let Model = require('../models')[mName];
      console.log('Model: ', Model);

      // ({router, Model}) =require(`./${fName}`)(router, Model);
      ({ router } = creatingOAandRoutes(router, Model, app));
      console.log('router: ', router);

      return app.use(`/${fName}`, router);
    });
};



function creatingOAandRoutes(router, Model, app) {
  const { routes, schemas, tags } = Model;
  let openapi = JSON.parse(JSON.stringify(require('../openApi.json')));

  let { paths: pathsOA, components: compOA } = openapi;

  for (const path in routes) {
    for (const info of routes[path]) {
      compOA.schemas = { ...compOA.schemas, ...schemas };
      console.log('compOA: ', compOA);

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
      console.log('op', op)

      router[op](path, async (req, res, next) => {
        const result = Model[method](req);
        res.send(result);
      });
    }
  }
  console.log('immm heree')
  console.log('router in ', router);

  console.log('openapi', openapi)

  return router;
}
