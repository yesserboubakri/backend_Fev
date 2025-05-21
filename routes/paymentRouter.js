const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Define routes
router.post('/payment', paymentController.createPayment);
router.get('/paymenta', paymentController.getAllPayments);
router.get('/paymentb/:id', paymentController.getPaymentById);
router.delete('/paymentc/:id', paymentController.deletePayment);
router.get('/user/:userId', paymentController.getPaymentsByUser);


module.exports = router;
