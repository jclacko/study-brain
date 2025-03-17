const express = require('express');
const router = express.Router();

router.get('/sets', (req, res) => {
  res.json({ message: 'Flashcard sets routes working!' });
});

router.get('/cards', (req, res) => {
  res.json({ message: 'Flashcards routes working!' });
});

module.exports = router;