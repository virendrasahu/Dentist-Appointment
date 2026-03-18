const express = require('express');
const router = express.Router();
const { loginAdmin, registerAdmin } = require('../controllers/authController');
const { validateLogin, validateRegister, handleValidationErrors } = require('../middleware/validationMiddleware');

// @route   POST /api/auth/login
// @desc    Authenticate admin and get token
// @access  Public
router.post('/login', validateLogin, handleValidationErrors, loginAdmin);

// @route   POST /api/auth/register
// @desc    Register a new admin
// @access  Public
router.post('/register', validateRegister, handleValidationErrors, registerAdmin);

module.exports = { router };
