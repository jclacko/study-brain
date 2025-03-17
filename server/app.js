const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const topicRoutes = require('./routes/topics');
const subtopicRoutes = require('./routes/subtopics');
const flashcardRoutes = require('./routes/flashcards');
const practiceTestRoutes = require('./routes/practiceTests');
const resourceRoutes = require('./routes/resources');
const studySessionRoutes = require('./routes/studySessions');
const settingsRoutes = require('./routes/settings');
const backupRoutes = require('./routes/backups');

// Import passport config
require('./config/passport');

// Initialize app
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ 
    mongoUrl: process.env.MONGODB_URI,
    ttl: 14 * 24 * 60 * 60 // 14 days
  }),
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 14 * 24 * 60 * 60 * 1000 // 14 days
  }
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/topics', topicRoutes);
app.use('/api/subtopics', subtopicRoutes);
app.use('/api/flashcards', flashcardRoutes);
app.use('/api/practice-tests', practiceTestRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/study-sessions', studySessionRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/backups', backupRoutes);

// Add a default route to show the API is working
app.get('/', (req, res) => {
  res.json({ message: 'StudyBrain API is working! Use /api routes to access functionality.' });
});

// Temporarily disable static file serving until client is built
// Serve static assets in production
/* 
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}
*/

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'production' ? {} : err
  });
});

module.exports = app;