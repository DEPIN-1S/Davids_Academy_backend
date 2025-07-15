const jwt = require('jsonwebtoken');

/**
 * Generate a short-lived access token.
 * @param {Object} payload - Data to embed in the token (e.g., user ID, role).
 * @returns {string} - Signed JWT.
 */
const generateAccessToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
};

/**
 * Generate a long-lived refresh token.
 * Can be stored in cookies or database for re-authentication.
 * @param {Object} payload - Same payload as access token.
 * @returns {string} - Refresh JWT.
 */
const generateRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET_KEY, {
        expiresIn: '7d',
    });
};

/**
 * Verify a token and return decoded data.
 * @param {string} token - The JWT token.
 * @param {string} [secret=JWT_SECRET_KEY] - The secret key to verify against.
 * @returns {Object} - Decoded payload or throws error if invalid.
 */
const verifyToken = (token, secret = process.env.JWT_SECRET_KEY) => {
    return jwt.verify(token, secret);
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyToken,
};
