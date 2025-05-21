const express = require('express');
const router = express.Router();
const Message = require('../models/messageSchema');
const messageController=require('../controllers/messageController')
router.post('/', messageController.sendMessage);
router.get('/:carId/:userId1/:userId2', messageController.getMessages);

router.post('/', async (req, res) => {
  try {
    const { carId, senderId, receiverId, text } = req.body;
    if (!carId || !senderId || !receiverId || !text) {
      return res.status(400).json({ message: 'البيانات ناقصة' });
    }
    const message = new Message({
      car: carId,
      sender: senderId,
      receiver: receiverId,
      text
    });
    await message.save();
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:carId/:userId1/:userId2', async (req, res) => {
  try {
    const { carId, userId1, userId2 } = req.params;
    const messages = await Message.find({
      car: carId,
      $or: [
        { sender: userId1, receiver: userId2 },
        { sender: userId2, receiver: userId1 }
      ]
    }).sort({ createdAt: 1 }); 
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
