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
      const Model = fName.charAt(0).toUpperCase() + fName.slice(1);
      defaultCrud(router, Model);
      require(`./${fName}`)(router);

      const ext = path.extname(fName);
      const fileName = path.basename(fName, ext);

      return app.use(`/${fileName}`, router)
    });
};



function defaultCrud(router, Model) {
  const router = express.Router();

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
