const db = require('../db');
const nodemailer = require('nodemailer');
const twilio = require('twilio');
const path = require('path');
const fs = require('fs');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASS
  }
});

// const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

// ✅ Submit Order
exports.submitOrder = (req, res) => {
  const { name, phone, email, state, country, serviceType, orderList, deliveryMethod, deliveryAddress } = req.body;

  if (!name || !phone || !email || !state || !country || !serviceType || !orderList || !deliveryMethod || !deliveryAddress) {
    return res.status(400).json({ message: 'Please fill in all required fields.' });
  }

  const trackingNo = 'OGA' + String(Math.floor(100000 + Math.random() * 900000));
  const status = 'received';

  const sql = `
    INSERT INTO orders (trackingNo, name, phone, email, state, country, serviceType, orderList, status, deliveryMethod, deliveryAddress)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const params = [trackingNo, name, phone, email, state, country, serviceType, orderList, status, deliveryMethod, deliveryAddress];

  db.run(sql, params, function (err) {
    if (err) {
      console.error('❌ DB Insert Error:', err.message);
      return res.status(500).json({ message: 'Server error' });
    }

    const messageBody = `
🛍️ Thank you for submitting your order to The Oga Importer!
Tracking Number: ${trackingNo}
✅ Paste your Tracking No in the link below to confirm your order and Our team will verify your request and follow up with an official invoice for payment.
Track your order here: http://localhost:5173/track
    `;

    // Email/SMS Logic (optional, currently commented out)

    res.json({
      message: '✅ Order submitted successfully.',
      orderId: this.lastID,
      trackingNo,
      status
    });
  });
};

// ✅ Track Order
exports.trackOrder = (req, res) => {
  const trackingNo = req.params.trackingNo;

  db.get('SELECT * FROM orders WHERE trackingNo = ?', [trackingNo], (err, row) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error finding order' });
    }

    if (!row) {
      return res.status(404).json({ message: 'Tracking number not found' });
    }

    res.status(200).json(row);
  });
};

// ✅ Get All Orders
exports.getAllOrders = (req, res) => {
  db.all('SELECT * FROM orders ORDER BY id DESC', [], (err, rows) => {
    if (err) {
      console.error('❌ Failed to load orders:', err.message);
      return res.status(500).json({ message: 'Database error' });
    }
    res.json(rows);
  });
};

// ✅ Update Order Status + Log Activity
exports.updateOrder = (req, res) => {
  const trackingNo = req.params.trackingNo;
  const { status, admin = 'admin' } = req.body; // frontend should send admin name or ID

  const sql = `
    UPDATE orders
    SET status = ?
    WHERE trackingNo = ?
  `;

  db.run(sql, [status, trackingNo], function (err) {
    if (err) {
      console.error('❌ Error updating order:', err.message);
      return res.status(500).json({ error: 'Database error' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Tracking number not found' });
    }

    // ✅ Log Activity
    const logSql = `INSERT INTO activity_logs (action, trackingNo, performedBy) VALUES (?, ?, ?)`;
    db.run(logSql, [`Updated status to '${status}'`, trackingNo, admin]);

    res.json({ message: '✅ Order updated successfully' });
  });
};

// ✅ Upload Invoice + Log Activity
exports.uploadInvoice = (req, res) => {
  const { trackingNo } = req.params;
  const performedBy = req.body.admin || 'admin';

  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }

  const ext = path.extname(req.file.originalname);
  const newName = `${trackingNo}_invoice${ext}`;
  const newPath = path.join('uploads', newName);

  fs.renameSync(req.file.path, newPath);

  db.run(
    'UPDATE orders SET invoiceUrl = ? WHERE trackingNo = ?',
    [newPath, trackingNo],
    function (err) {
      if (err) {
        console.error('❌ Invoice DB error:', err);
        return res.status(500).json({ message: 'DB error' });
      }

      // ✅ Log Activity
      db.run(`INSERT INTO activity_logs (action, trackingNo, performedBy) VALUES (?, ?, ?)`,
        ['Uploaded invoice', trackingNo, performedBy]);

      res.json({ message: '✅ Invoice uploaded', invoiceUrl: newPath });
    }
  );
};

// ✅ Get All Activity Logs
exports.getActivityLogs = (req, res) => {
  db.all('SELECT * FROM activity_logs ORDER BY id DESC', [], (err, rows) => {
    if (err) {
      console.error('❌ Failed to fetch activity logs:', err.message);
      return res.status(500).json({ message: 'Database error' });
    }
    res.json(rows);
  });
};

// ✅ Get Orders for a Specific User (by email)
exports.getUserOrders = (req, res) => {
  const email = req.params.email;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  db.all('SELECT * FROM orders WHERE email = ? ORDER BY id DESC', [email], (err, rows) => {
    if (err) {
      console.error('❌ Failed to load user orders:', err.message);
      return res.status(500).json({ message: 'Database error' });
    }

    res.json(rows);
  });
};
