const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { body } = require('express-validator');

// POST /api/contact
router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('message').notEmpty().withMessage('Message is required')
  ],
  contactController.submitContact
);

module.exports = router;
