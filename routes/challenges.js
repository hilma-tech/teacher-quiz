const { Challenges } = require('../models');

let express = require('express');
let router = express.Router();

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const elements = await Challenges.findAll();
  res.send(elements);
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params
  const elenemt = await Challenges.findAll({ where: { id } });
  res.send(elenemt);
});

router.post('/', async (req, res, next) => {
  const c = await Challenges.create(req.body)
  res.send(c);
});

router.put('/:id', async (req, res, next) => {
  const { id } = req.params
  const up = await Challenges.update(req.body, { where: { id } })
  res.send(up);
});


router.delete('/:id', async (req, res, next) => {
  const { id } = req.params
  const del = await Challenges.destroy({ where: { id } })
  res.send(del);
});


module.exports = router;
