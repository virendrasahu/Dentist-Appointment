const Appointment = require('../models/Appointment');
const Dentist = require('../models/Dentist');

// @desc    Get all appointments (populate dentist details)
// @route   GET /api/appointments
// @access  Private (Admin only)
const getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find().populate('dentistId', 'name clinicName');
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch appointments', error: err.message });
    }
};

// @desc    Create a new appointment
// @route   POST /api/appointments
// @access  Public
const createAppointment = async (req, res) => {
    try {
        const { patientName, age, gender, dentistId, date, time } = req.body;

        // Verify that the dentist exists
        const dentistExists = await Dentist.findById(dentistId);
        if (!dentistExists) {
            return res.status(404).json({ message: 'Selected dentist not found' });
        }

        const appointment = new Appointment({
            patientName,
            age,
            gender,
            dentistId,
            date,
            time
        });

        const savedAppointment = await appointment.save();
        res.status(201).json(savedAppointment);
    } catch (err) {
        res.status(400).json({ message: 'Failed to book appointment', error: err.message });
    }
};

// @desc    Update appointment status
// @route   PUT /api/appointments/:id/status
// @access  Private (Admin only)
const updateAppointmentStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const validStatuses = ['Pending', 'Booked', 'Cancel', 'Completed'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status provided' });
        }

        const appointment = await Appointment.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true }
        );

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        res.json(appointment);
    } catch (err) {
        res.status(500).json({ message: 'Failed to update status', error: err.message });
    }
};

module.exports = {
    getAppointments,
    createAppointment,
    updateAppointmentStatus
};
