const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../db');
const jwt = require('jsonwebtoken');

// POST /api/users/register
exports.registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // ✅ FIXED: Declare properly before use
  const { name, email, phone, businessType, password, role = 'user' } = req.body;

  if (!password) {
    return res.status(400).json({ message: 'Password is required.' });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    db.run(
      'INSERT INTO users (name, email, phone, businessType, password, role) VALUES (?, ?, ?, ?, ?, ?)',
      [name, email, phone, businessType, hashedPassword, role],
      function (err) {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Server error' });
        }

        res.json({ message: 'User registered successfully', user: { id: this.lastID } });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


// POST /api/users/login
exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role || 'user' },
      process.env.JWT_SECRET || 'secretkey',
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        role: user.role || 'user',
        email: user.email
      }
    });
  });
};

// GET /api/users/check-email?email=xxx
exports.checkEmail = (req, res) => {
  const { email } = req.query;
  db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
    if (err) return res.status(500).json({ message: 'Error checking email.' });
    return res.json({ exists: !!user });
  });
};

// POST /api/users/reset-password
exports.resetPassword = (req, res) => {
  const { email, newPassword } = req.body;

  bcrypt.hash(newPassword, 10, (err, hash) => {
    if (err) return res.status(500).json({ message: 'Error hashing password' });

    db.run('UPDATE users SET password = ? WHERE email = ?', [hash, email], function (err) {
      if (err) return res.status(500).json({ message: 'DB error' });
      res.json({ message: '✅ Password reset successful' });
    });
  });
};