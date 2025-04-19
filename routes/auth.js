const express = require('express');
const router = express.Router();
const authController = require('../controllers/authcontroller');


router.get('/login', authController.showLoginForm);


router.post('/login', authController.handleLogin);


router.get('/logout', authController.logout);

module.exports = router;
