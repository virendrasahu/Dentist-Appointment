const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    patientName: { 
        type: String, 
        required: [true, 'Patient name is required'],
        trim: true
    },
    age: { 
        type: Number, 
        required: [true, 'Patient age is required'],
        min: [0, 'Age cannot be negative']
    },
    gender: { 
        type: String, 
        required: [true, 'Gender is required'],
        enum: ['Male', 'Female', 'Other']
    },
    dentistId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Dentist', 
        required: [true, 'Dentist reference ID is required'] 
    },
    // Keep raw date for legacy usage but split for logic
    date: { 
        type: String, 
        required: [true, 'Appointment date is required'] 
    },
    time: { 
        type: String, 
        required: [true, 'Appointment time is required'] 
    },
    status: {
        type: String,
        enum: ['Pending', 'Booked', 'Cancel', 'Completed'],
        default: 'Pending'
    }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
