const { validationResult, check } = require('express-validator');

// Validation rules for booking an appointment
const validateAppointment = [
    check('patientName', 'Patient Name is required').not().isEmpty(),
    check('age', 'Age must be a valid number').isNumeric(),
    check('gender', 'Gender must be Male, Female, or Other').isIn(['Male', 'Female', 'Other']),
    check('dentistId', 'Dentist ID must be a valid Mongo ID').isMongoId(),
    check('date', 'Date is required').not().isEmpty(),
    check('time', 'Time is required').not().isEmpty(),
];

// Validation rules for login
const validateLogin = [
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
];

// Validation rules for register
const validateRegister = [
    check('username', 'Username must be at least 3 characters long').isLength({ min: 3 }),
    check('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
];

// Middleware execution wrapper
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(err => err.msg).join(', ');
        res.status(400);
        return next(new Error(errorMessages));
    }
    next();
};

module.exports = {
    validateAppointment,
    validateLogin,
    validateRegister,
    handleValidationErrors
};
