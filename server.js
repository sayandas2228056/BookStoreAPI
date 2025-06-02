const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const booksRouter = require('./routes/books');
const usersRouter = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from client directory
app.use(express.static(path.join(__dirname, 'client')));

// Routes
app.use('/api/books', booksRouter);
app.use('/api/users', usersRouter);

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Bookstore server running on http://localhost:${PORT}`);
});

module.exports = app;