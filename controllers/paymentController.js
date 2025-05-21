const Payment = require('../models/paymentSchema');

// Create a new payment
exports.createPayment = async (req, res) => {
    try {
        const { userId, amount, method } = req.body;

        if (!userId || !amount || !method) {
            return res.status(400).json({ message: 'userId, amount et method sont requis.' });
        }

        const payment = new Payment({
            userId,
            amount,
            method,
            status: 'completed' 
        });

        await payment.save();
        res.status(201).json(payment);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création du paiement.', error: error.message });
    }
};

// Get all payments
exports.getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find().populate('userId', 'username email');
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des paiements.', error: error.message });
    }
};

// Get payment by ID
exports.getPaymentById = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id).populate('userId', 'username email');
        if (!payment) return res.status(404).json({ message: 'Paiement non trouvé.' });
        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération du paiement.', error: error.message });
    }
};
exports.getPaymentsByUser = async (req, res) => {
    try {
        const payments = await Payment.find({ userId: req.params.userId }).populate('userId', 'username email');
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des paiements de l\'utilisateur.', error: error.message });
    }
};


// Delete payment
exports.deletePayment = async (req, res) => {
    try {
        const deleted = await Payment.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Paiement non trouvé.' });
        res.status(200).json({ message: 'Paiement supprimé avec succès.' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du paiement.', error: error.message });
    }
};
