const express = require('express');
const router = express.Router();

// Basic route for testing
router.get('/test', (req, res) => {
  res.json({ message: 'Auth routes working!' });
});

// This will be expanded later with Google OAuth
router.get('/google', (req, res) => {
  res.json({ message: 'Google auth endpoint (placeholder)' });
});

module.exports = router;