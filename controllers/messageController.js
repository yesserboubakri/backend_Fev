const mongoose = require('mongoose');
const Message = require('../models/messageSchema');
const User = require('../models/userSchema');

// إرسال رسالة جديدة
exports.sendMessage = async (req, res) => {
  try {
    const { carId, senderId, receiverId, text } = req.body;

    if (!carId || !senderId || !receiverId || !text) {
      return res.status(400).json({ message: 'Données manquantes' });
    }

    const message = await Message.create({
      car: new mongoose.Types.ObjectId(carId),
      sender: new mongoose.Types.ObjectId(senderId),
      receiver: new mongoose.Types.ObjectId(receiverId),
      text
    });

    // ربط الرسالة بالمستخدم المستقبل
    await User.findByIdAndUpdate(receiverId, {
      $push: { messages: message._id }
    });

    res.status(201).json(message);
  } catch (err) {
    console.error('Error in sendMessage:', err);
    res.status(500).json({ message: err.message });
  }
};

// جلب الرسائل بين مستخدمين بخصوص سيارة معينة مع إحضار بيانات المرسل والمستقبل والسيارة
exports.getMessages = async (req, res) => {
  try {
    const { carId, userId1, userId2 } = req.params;

    if (
      !mongoose.Types.ObjectId.isValid(carId) ||
      !mongoose.Types.ObjectId.isValid(userId1) ||
      !mongoose.Types.ObjectId.isValid(userId2)
    ) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const messages = await Message.find({
      car: new mongoose.Types.ObjectId(carId),
      $or: [
        { sender: new mongoose.Types.ObjectId(userId1), receiver: new mongoose.Types.ObjectId(userId2) },
        { sender: new mongoose.Types.ObjectId(userId2), receiver: new mongoose.Types.ObjectId(userId1) }
      ]
    })
    .sort({ createdAt: 1 })
    .populate('sender', 'username email')      
    .populate('receiver', 'username email')  
          

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllUserMessages = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const messages = await Message.find({
      $or: [{ sender: id }, { receiver: id }]
    })
    .sort({ createdAt: 1 })
    .populate('sender', 'username email')
    .populate('receiver', 'username email')
    .populate('car', 'model prix');

    res.status(200).json({ messages });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
