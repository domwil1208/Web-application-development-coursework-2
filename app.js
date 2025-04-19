const express = require('express');
const mustacheExpress = require('mustache-express');
const session = require('express-session');
const path = require('path');

const publicRoutes = require('./routes/public');
const authRoutes = require('./routes/auth');
const organiserRoutes = require('./routes/organiser');

const app = express();
const PORT = 3000;

// Set up Mustache
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'supersecret',
  resave: false,
  saveUninitialized: false
}));

// Routes
app.use('/', publicRoutes);
app.use('/', authRoutes);
app.use('/organiser', organiserRoutes);
app.use('/', require('./routes/public'));
app.use(express.static(path.join(__dirname, 'public')));


// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
