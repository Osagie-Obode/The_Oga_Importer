const db = require('../db');

exports.getAllServices = (req, res) => {
  db.all('SELECT * FROM services', [], (err, rows) => {
    if (err) {
      console.error('Error fetching services:', err.message);
      return res.status(500).json({ message: 'Failed to fetch services' });
    }

    res.status(200).json(rows);
  });
};
