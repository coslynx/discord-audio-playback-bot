const { createLogger, format, transports } = require('winston');

// Create a logger instance
const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    transports: [
        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.simple()
            )
        }),
        new transports.File({ filename: 'error.log', level: 'error' }),
        new transports.File({ filename: 'combined.log' }),
    ],
});

// Middleware to log all requests
const logRequests = (req, res, next) => {
    logger.info(`Request: ${req.method} ${req.url}`);
    next();
};

// Error logging function
const logError = (error, req, res, next) => {
    logger.error(`Error: ${error.message}`);
    next(error);
};

// Use error-handling middleware to capture errors
const errorHandler = (err, req, res, next) => {
    logger.error(`Error occurred: ${err.message}`);
    res.status(err.status || 500).json({
        message: 'Internal Server Error',
        error: err.message
    });
};

// Exporting logger and middleware functions
module.exports = {
    logger,
    logRequests,
    logError,
    errorHandler
};