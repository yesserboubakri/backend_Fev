const customerModel = require('../models/customerSchema');

// CREATE - Add a new customer
module.exports.addCustomer = async (req, res) => {
    try {
        const { name, email, phone, address } = req.body;
        const customer = await customerModel.create({ name, email, phone, address });
        res.status(200).json({ customer });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// READ - Get all customers
module.exports.getAllCustomers = async (req, res) => {
    try {
        const customers = await customerModel.find();
        res.status(200).json({ customers });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// READ - Get customer by ID
module.exports.getCustomerById = async (req, res) => {
    try {
        const { id } = req.params;
        const customer = await customerModel.findById(id);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }
        res.status(200).json({ customer });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE - Update customer by ID
module.exports.updateCustomerById = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, address } = req.body;
        const updated = await customerModel.findByIdAndUpdate(id, {
            $set: { name, email, phone, address }
        }, { new: true });

        if (!updated) {
            return res.status(404).json({ message: "Customer not found" });
        }

        res.status(200).json({ updated });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE - Delete customer by ID
module.exports.deleteCustomerById = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await customerModel.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: "Customer not found" });
        }
        res.status(200).json("Customer deleted successfully");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
