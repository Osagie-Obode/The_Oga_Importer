const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });        // files land in server/uploads/
                                                     // you can tweak the dest later

// Get all orders
router.get('/', ordersController.getAllOrders);

// Create new order
router.post('/submit', ordersController.submitOrder);

// Track order by tracking number
router.get('/:trackingNo', ordersController.trackOrder);

// Update order by tracking number
router.put('/:trackingNo/update', ordersController.updateOrder);

// ⬇️ NEW: upload invoice (PDF / image)
router.post(
  '/:trackingNo/invoice',
  upload.single('invoice'),
  ordersController.uploadInvoice
);

module.exports = router;
