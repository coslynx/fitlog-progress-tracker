const jwt = require('jsonwebtoken');

// Middleware function to verify JWT token
const authMiddleware = (req, res, next) => {
    // Get the token from the Authorization header
    const authHeader = req.headers.authorization;


    // Check if the token exists
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2 || parts[0] !== 'Bearer') {
         return res.status(401).json({ message: 'Invalid token format' });
    }


    const token = parts[1];

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            // If the token is invalid, return a 401 error with the error message
             return res.status(401).json({ message: err.message });
        }

        // If the token is valid, extract the user ID and attach it to the req object
        req.user = { id: decoded.id };
        // Call the next middleware in the chain
        next();
    });
};

module.exports = {
    authMiddleware,
};