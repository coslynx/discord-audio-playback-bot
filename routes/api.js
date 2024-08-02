const express = require('express');
const musicRoutes = require('./musicRoutes');
const { handleError } = require('../utils/errorHandler');
const { logger } = require('../utils/logger');

const router = express.Router();

// Mount musicRoutes on API endpoint
router.use('/music', musicRoutes);

// Global error handling for all routes
router.use((err, req, res, next) => {
    logger.error(`Error at ${req.path}: ${err.message}`);
    handleError(req, err);
});

// Test route to confirm API is working
router.get('/health', (req, res) => {
    res.status(200).json({ message: 'API is running smoothly' });
});

// Fallback route for unmatched API endpoints
router.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

module.exports = router;