const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'User settings routes working!' });
});

router.put('/', (req, res) => {
  res.json({ message: 'Settings would be updated here' });
});

module.exports = router;