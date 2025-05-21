const Message = require('../models/messageSchema'); // عدّل الاسم حسب ملفك
const mongoose = require('mongoose');
// إرسال رسالة جديدة
exports.sendMessage = async (req, res) => {
  try {
    const { carId, senderId, receiverId, text } = req.body;

    if (!carId || !senderId || !receiverId || !text) {
      return res.status(400).json({ message: 'البيانات ناقصة' });
    }

    if (
      !mongoose.Types.ObjectId.isValid(carId) ||
      !mongoose.Types.ObjectId.isValid(senderId) ||
      !mongoose.Types.ObjectId.isValid(receiverId)
    ) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const message = new Message({
      car: mongoose.Types.ObjectId(carId),
      sender: mongoose.Types.ObjectId(senderId),
      receiver: mongoose.Types.ObjectId(receiverId),
      text
    });

    await message.save();
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { carId, userId1, userId2 } = req.params;

    // تحقق من صلاحية الـ IDs
    if (
      !mongoose.Types.ObjectId.isValid(carId) ||
      !mongoose.Types.ObjectId.isValid(userId1) ||
      !mongoose.Types.ObjectId.isValid(userId2)
    ) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const messages = await Message.find({
      car: mongoose.Types.ObjectId(carId),
      $or: [
        { sender: mongoose.Types.ObjectId(userId1), receiver: mongoose.Types.ObjectId(userId2) },
        { sender: mongoose.Types.ObjectId(userId2), receiver: mongoose.Types.ObjectId(userId1) }
      ]
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};