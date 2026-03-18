const errorHandler = (err, req, res, next) => {
    // Determine the status code
    let statusCode = res.statusCode ? res.statusCode : 500;

    // Handle Mongoose Validation Errors seamlessly
    if (err.name === 'ValidationError') {
        statusCode = 400;
    }

    // Set status code
    res.status(statusCode);

    // Send uniform JSON response
    res.json({
        message: err.message || 'An unexpected error occurred',
        // Stack trace included only in development
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

module.exports = { errorHandler };
