const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.post('/add', customerController.addCustomer);
router.get('/all', customerController.getAllCustomers);
router.get('/:id', customerController.getCustomerById);
router.put('/update/:id', customerController.updateCustomerById);
router.delete('/delete/:id', customerController.deleteCustomerById);

module.exports = router;
