const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Resources routes working!' });
});

router.get('/subtopic/:subtopicId', (req, res) => {
  res.json({ message: `Getting resources for subtopic ${req.params.subtopicId}` });
});

module.exports = router;