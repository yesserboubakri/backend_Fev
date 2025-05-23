const express = require('express');
const router = express.Router();
const User = require('../models/userSchema');
const Message = require('../models/messageSchema');
const messageController = require('../controllers/messageController');

// إرسال رسالة جديدة
router.post('/', messageController.sendMessage);

// جلب الرسائل بين مستخدمين بخصوص سيارة معينة
router.get('/:carId/:userId1/:userId2', messageController.getMessages);

// جلب كل الرسائل التي يكون المستخدم طرف فيها (مرسل أو مستقبل)
router.get('/user/:id/messages', messageController.getAllUserMessages);

module.exports = router;
