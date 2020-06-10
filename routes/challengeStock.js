const { ChallengeStock } = require('../models');

let express = require('express');
let router = express.Router();

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const elements = await ChallengeStock.findAll();
  res.send(elements);
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params
  const elenemt = await ChallengeStock.findAll({ where: { id } });
  res.send(elenemt);
});

router.post('/', async (req, res, next) => {
  const c = await ChallengeStock.create(req.body)
  res.send(c);
});

router.put('/:id', async (req, res, next) => {
  const { id } = req.params
  const up = await ChallengeStock.update(req.body, { where: { id } })
  res.send(up);
});


router.delete('/:id', async (req, res, next) => {
  const { id } = req.params
  const del = await ChallengeStock.destroy({ where: { id } })
  res.send(del);
});


module.exports = router;
