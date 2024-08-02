const jwt = require('jsonwebtoken');
const { logger } = require('../utils/logger');

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.sendStatus(401); // Unauthorized
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            logger.error(`Token verification failed: ${err.message}`);
            return res.sendStatus(403); // Forbidden
        }
        req.user = user;
        next();
    });
};

const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            logger.warn(`User ${req.user.username} attempted unauthorized access.`);
            return res.status(403).json({ message: 'You do not have permission to perform this action.' });
        }
        next();
    };
};

module.exports = {
    authenticateToken,
    authorizeRoles,
};