const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: [true, 'Username is required'], 
        trim: true,
        unique: true,
        minlength: [3, 'Username must be at least 3 characters long']
    },
    password: { 
        type: String, 
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    role: {
        type: String,
        enum: ['superadmin', 'admin'],
        default: 'admin'
    }
}, { timestamps: true });

module.exports = mongoose.model('Admin', adminSchema);
