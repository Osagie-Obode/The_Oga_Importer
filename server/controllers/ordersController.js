const db = require('../db');
const nodemailer = require('nodemailer');
const twilio = require('twilio');
const path = require('path');
const fs   = require('fs');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASS
  }
});

//const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

// Submit Order
exports.submitOrder = (req, res) => {
  const { name, phone, email, state, country, orderList, deliveryMethod, deliveryAddress } = req.body;

  if (!name || !phone || !email || !state || !country || !orderList || !deliveryMethod || !deliveryAddress) {
    return res.status(400).json({ message: 'Please fill in all required fields.' });
  }

  const trackingNo = 'OGA' + String(Math.floor(100000 + Math.random() * 900000));
  const status = 'received';

  const sql = `
    INSERT INTO orders (trackingNo, name, phone, email, state, country, orderList, status, deliveryMethod, deliveryAddress)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const params = [trackingNo, name, phone, email, state, country, orderList, 'received', deliveryMethod, deliveryAddress];

  db.run(sql, params, function (err) {
    if (err) {
      console.error('❌ DB Insert Error:', err.message);
      return res.status(500).json({ message: 'Server error' });
    }

    const messageBody = `
🛍️ Thank you for submitting your order to The Oga Importer!
Tracking Number: ${trackingNo}
✅ Paste your Tracking No in the link below to confirm your order and Our team will verify your request and follow up with an official invoice for payment.
You can track the progress on our website: http://localhost:5173/track
    `;

    // Send confirmation email
    //transporter.sendMail({
    //  from: process.env.SMTP_EMAIL,
    //  to: email,
    //  subject: 'Your Order - The Oga Importer',
    //  text: messageBody
    //}, (err, info) => {
    //  if (err) console.error('❌ Email Error:', err);
    //  else console.log('📧 Email sent:', info.response);
    //});

    // Optional: Send SMS if phone starts with + (international format)
    //if (phone.startsWith('+')) {
    //  twilioClient.messages.create({
    //    body: messageBody,
    //    from: process.env.TWILIO_PHONE,
    //    to: phone
    //  }).then(msg => console.log('📲 SMS sent:', msg.sid))
    //    .catch(err => console.error('❌ SMS Error:', err));
    //}

    res.json({
      message: '✅ Order submitted successfully.',
      orderId: this.lastID,
      trackingNo,
      status
    });
  });
};

// Track Order
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

// Get all orders
exports.getAllOrders = (req, res) => {
  db.all('SELECT * FROM orders ORDER BY id DESC', [], (err, rows) => {
    if (err) {
      console.error('❌ Failed to load orders:', err.message);
      return res.status(500).json({ message: 'Database error' });
    }
    res.json(rows);
  });
};

// Update Shipment or Delivery Method
exports.updateOrder = (req, res) => {
  const trackingNo = req.params.trackingNo;
  const { status } = req.body;

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

    res.json({ message: '✅ Order updated successfully' });
  });
};

exports.uploadInvoice = (req, res) => {
  const { trackingNo } = req.params;

  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }

  // rename the file for clarity: uploads/OGA000123_invoice.pdf
  const ext        = path.extname(req.file.originalname);
  const newName    = `${trackingNo}_invoice${ext}`;
  const newPath    = path.join('uploads', newName);

  fs.renameSync(req.file.path, newPath);

  db.run(
    'UPDATE orders SET invoiceUrl = ? WHERE trackingNo = ?',
    [newPath, trackingNo],
    function (err) {
      if (err) {
        console.error('❌ Invoice DB error:', err);
        return res.status(500).json({ message: 'DB error' });
      }
      res.json({ message: '✅ Invoice uploaded', invoiceUrl: newPath });
    }
  );
};

