const { validationResult } = require('express-validator');
const db = require('../db');

exports.submitContact = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, message } = req.body;

  db.run(
    'INSERT INTO contacts (name, email, message, createdAt) VALUES (?, ?, ?, datetime("now"))',
    [name, email, message],
    function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
      }

      res.json({ message: 'Contact message submitted successfully!' });
    }
  );
};
