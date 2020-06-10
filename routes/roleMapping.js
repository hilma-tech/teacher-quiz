const { RoleMapping } = require('../models');

let express = require('express');
let router = express.Router();

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const elements = await RoleMapping.findAll();
  res.send(elements);
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params
  const elenemt = await RoleMapping.findAll({ where: { id } });
  res.send(elenemt);
});

router.post('/', async (req, res, next) => {
  const c = await RoleMapping.create(req.body)
  res.send(c);
});

router.put('/:id', async (req, res, next) => {
  const { id } = req.params
  const up = await RoleMapping.update(req.body, { where: { id } })
  res.send(up);
});


router.delete('/:id', async (req, res, next) => {
  const { id } = req.params
  const del = await RoleMapping.destroy({ where: { id } })
  res.send(del);
});


module.exports = router;
