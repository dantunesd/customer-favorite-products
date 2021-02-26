const express = require('express');

const router = express.Router();

router.put('/:customerId?', (req, res) => {
  res.json({ message: req.body });
});

router.get('/:customerId', (req, res) => {
  res.json({ message: 'hello word' });
});

module.exports = router;
