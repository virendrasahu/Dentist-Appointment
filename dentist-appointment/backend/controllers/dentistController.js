const Dentist = require('../models/Dentist');

// @desc    Get all dentists
// @route   GET /api/dentists
// @access  Public
const getDentists = async (req, res) => {
    try {
        const dentists = await Dentist.find();
        res.json(dentists);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch dentists', error: err.message });
    }
};

// @desc    Add a new dentist
// @route   POST /api/dentists
// @access  Private (Admin only)
const addDentist = async (req, res) => {
    try {
        const dentist = new Dentist(req.body);
        const savedDentist = await dentist.save();
        res.status(201).json(savedDentist);
    } catch (err) {
        res.status(400).json({ message: 'Failed to create dentist. Check input data.', error: err.message });
    }
};

module.exports = {
    getDentists,
    addDentist
};
