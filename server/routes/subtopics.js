const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Subtopics routes working!' });
});

router.get('/topic/:topicId', (req, res) => {
  res.json({ message: `Getting subtopics for topic ${req.params.topicId}` });
});

module.exports = router;