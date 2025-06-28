const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../db');

// POST /api/users/register
exports.registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, phone, businessType, password } = req.body;
  if (!password) {
    return res.status(400).json({ message: 'Password is required.' });
  }

  try {
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert user
    db.run(
      'INSERT INTO users (name, email, phone, businessType, password) VALUES (?, ?, ?, ?, ?)',
      [name, email, phone, businessType, hashedPassword],
      function (err) {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Server error' });
        }

        res.json({ message: 'User registered successfully', userId: this.lastID });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
