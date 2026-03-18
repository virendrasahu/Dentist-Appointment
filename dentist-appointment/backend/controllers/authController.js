const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_jwt_key_here';

const loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Find admin
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        // Verify password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        // Create token
        const payload = {
            id: admin._id,
            username: admin.username,
            role: admin.role
        };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
        
        res.json({
            token,
            admin: payload
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error during authentication', error: err.message });
    }
};

const registerAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingAdmin = await Admin.findOne({ username });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Username is already taken' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newAdmin = await Admin.create({
            username,
            password: hashedPassword,
            role: 'admin' // Create as generic admin by default
        });

        res.status(201).json({ message: 'Admin registered successfully', username: newAdmin.username });
    } catch (err) {
        res.status(500).json({ message: 'Server error during registration', error: err.message });
    }
};

module.exports = {
    loginAdmin,
    registerAdmin
};
