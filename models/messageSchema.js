const mongoose = require('mongoose');  // هل استوردته؟
const Message = require('../models/messageSchema');

exports.sendMessage = async (req, res) => {
    try {
        const { carId, senderId, receiverId, text } = req.body;
        if (!carId || !senderId || !receiverId || !text) {
            return res.status(400).json({ message: 'Données manquantes' });
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
        console.error('Error in sendMessage:', err);  // هنا اطبع الخطأ في التيرمنال
        res.status(500).json({ message: err.message });
    }
};
