// src/middleware/verifyToken.js
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger'); // Winston logger
const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const SECRET_KEY = process.env.JWT_SECRET_KEY;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            logger.warn('Token missing in request headers');
            return res.status(401).json({ result: false, message: 'No token provided' });
        }
        const token = authHeader.split(' ')[1];
        jwt.verify(token, SECRET_KEY, async (err, decoded) => {
            if (err) {
                logger.error('Invalid token', { error: err.message });
                return res.status(403).json({ result: false, message: 'Invalid or expired token' });
            }
            req.user = decoded;
            logger.info(`Token verified for user ID: ${decoded.user_id}, Role: ${decoded.role}`);
            next();
        });
    } catch (err) {
        logger.error('Token verification error', { error: err.message });
        return res.status(500).json({ result: false, message: 'Authentication error' });
    }
};


const verifyRole = (allowedRoles = []) => {
    return async (req, res, next) => {
        try {
            const role = req.user?.role;

            if (!role) {
                return res.status(401).json({
                    result: false,
                    message: "Role not found in token"
                });
            }

            if (!allowedRoles.includes(role)) {
                return res.status(403).json({
                    result: false,
                    message: "Access denied. Insufficient permissions."
                });
            }

            next(); // ✅ Role is allowed, move to the next middleware/controller
        } catch (err) {
            logger.error('Role verification error', { error: err.message });
            return res.status(500).json({
                result: false,
                message: 'Internal server error'
            });
        }
    };
}

module.exports = { verifyToken, verifyRole };
