const express = require('express');
const router = express.Router();
const { getDentists, addDentist } = require('../controllers/dentistController');
const { protect } = require('../middleware/authMiddleware');

// @route   GET /api/dentists
// @desc    Get all dentists
// @access  Public
router.get('/', getDentists);

// @route   POST /api/dentists
// @desc    Add a new dentist
// @access  Private Admin
router.post('/', protect, addDentist);

module.exports = router;
