const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// Register
router.post('/register', usersController.registerUser);

// Future: router.post('/login', ...)

module.exports = router;
