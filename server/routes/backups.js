const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Backups routes working!' });
});

router.post('/', (req, res) => {
  res.json({ message: 'Creating a new backup' });
});

module.exports = router;