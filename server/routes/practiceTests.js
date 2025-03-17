const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Practice tests routes working!' });
});

router.get('/subtopic/:subtopicId', (req, res) => {
  res.json({ message: `Getting practice test for subtopic ${req.params.subtopicId}` });
});

module.exports = router;