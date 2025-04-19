const userModel = require('../models/user');  
const bcrypt = require('bcrypt');

// Render the login form 
exports.showLoginForm = (req, res) => {
  res.render('public/login');
};

// Handle login form submission 
exports.handleLogin = (req, res) => {
  const { username, password } = req.body; 
  userModel.findUser(username, (err, user) => {
    if (err || !user) {
      return res.send('Invalid username or password'); 
    }

    // Compare password with stored hashed password
    bcrypt.compare(password, user.passwordHash, (err, match) => {
      if (match) {
        req.session.userId = user._id;  // Store user id in session
        req.session.role = user.role;    // Store user role in session
        res.redirect(user.role === 'organiser' ? '/organiser/dashboard' : '/');
      } else {
        res.send('Invalid username or password');  // If passwords don't match
      }
    });
  });
};

// Handle logout 
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');  // Redirect to homepage after logout
  });
};
