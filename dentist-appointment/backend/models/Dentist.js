const mongoose = require('mongoose');

const dentistSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'Dentist name is required'],
        trim: true
    },
    photo: { 
        type: String, 
        default: 'https://via.placeholder.com/150' 
    },
    specialization: { // Replaced qualification to match requirement
        type: String, 
        required: [true, 'Specialization is required'],
        trim: true
    },
    experience: { 
        type: Number, 
        required: [true, 'Years of experience are required'],
        min: [0, 'Experience cannot be negative']
    },
    clinicName: { 
        type: String, 
        required: [true, 'Clinic name is required'],
        trim: true
    },
    address: { 
        type: String, 
        required: [true, 'Address is required'],
        trim: true
    },
    location: { 
        type: String, 
        required: [true, 'Location is required'],
        trim: true
    },
    availability: {
        type: [String],
        default: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    }
}, { timestamps: true });

module.exports = mongoose.model('Dentist', dentistSchema);
