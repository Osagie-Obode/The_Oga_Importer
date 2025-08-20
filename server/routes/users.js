const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// Register
router.post('/register', usersController.registerUser);

// Login
// router.post('/login', usersController.loginUser);

// Future: router.post('/login', ...)

module.exports = router;


router.get('/check-email', usersController.checkEmail);
router.post('/reset-password', usersController.resetPassword);
