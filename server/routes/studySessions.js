const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Study sessions routes working!' });
});

router.get('/analytics/daily', (req, res) => {
  res.json({ message: 'Getting daily study analytics' });
});

module.exports = router;