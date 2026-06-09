const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

// Route imports
const dentistRoutes = require('./routes/dentistRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const { router: authRouter } = require('./routes/authRoutes');

// Middleware imports
const { errorHandler } = require('./middleware/errorMiddleware');

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middlewares
app.use(helmet()); // Set security HTTP headers
app.use(
    cors({
        origin: process.env.CORS_ORIGIN
            ? process.env.CORS_ORIGIN.split(',')
            : (origin, callback) => {
                const allowed =
                    !origin ||
                    /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin) ||
                    origin === 'https://dentist-appointment-opal.vercel.app';
                callback(allowed ? null : new Error('Not allowed by CORS'), allowed);
            },
        credentials: true,
    })
);

// Rate limiting to prevent brute-force attacks
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again after 15 minutes',
});
app.use('/api', limiter);

// Body parser
app.use(express.json());

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/dentists', dentistRoutes);
app.use('/api/appointments', appointmentRoutes);

// Handle unknown routes with a descriptive error message
app.use((req, res, next) => {
    res.status(404);
    next(new Error(`Route not found: ${req.originalUrl}`));
});

// Centralized Error Handling Middleware
app.use(errorHandler);

// Structured MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dentist-booking';
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(`Error connecting to MongoDB: ${err.message}`);
        process.exit(1);
    }
};

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    });
});
