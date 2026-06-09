const express = require('express');
const router = express.Router();
const { getAppointments, createAppointment, updateAppointmentStatus, deleteAppointment } = require('../controllers/appointmentController');
const { protect } = require('../middleware/authMiddleware');
const { validateAppointment, handleValidationErrors } = require('../middleware/validationMiddleware');

// @route   GET /api/appointments
// @desc    Get all appointments
// @access  Private Admin
router.get('/', protect, getAppointments);

// @route   POST /api/appointments
// @desc    Book an appointment
// @access  Public
router.post('/', validateAppointment, handleValidationErrors, createAppointment);

// @route   PUT /api/appointments/:id/status
// @desc    Update appointment status
// @access  Private Admin
router.put('/:id/status', protect, updateAppointmentStatus);

// @route   DELETE /api/appointments/:id
// @desc    Delete an appointment
// @access  Private Admin
router.delete('/:id', protect, deleteAppointment);

module.exports = router;
