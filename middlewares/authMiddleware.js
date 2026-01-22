/**
 * Authentication middleware
 * Validates JWT token and stores user info in request
 */
const jwt = require("jsonwebtoken");

const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-in-production";

// JWT validation middleware
const authMiddleware = (req, res, next) => {
  try {
    // Get token from Authorization header or cookies
    const token =
      req.headers.authorization?.replace("Bearer ", "") || req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        status: 401,
        message: "Unauthorized - No token provided",
        data: null,
      });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      status: 401,
      message: "Unauthorized - Invalid token",
      data: null,
    });
  }
};

/**
 * Optional authentication middleware
 * Does not require authentication but attaches user if available
 */
const optionalAuthMiddleware = (req, res, next) => {
  try {
    const token =
      req.headers.authorization?.replace("Bearer ", "") || req.cookies?.token;

    if (token) {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
    }

    next();
  } catch (error) {
    // Continue even if token is invalid
    next();
  }
};

// Export JWT utilities for use in controllers
module.exports = {
  authMiddleware,
  optionalAuthMiddleware,
  generateToken: (payload) =>
    jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" }),
  verifyToken: (token) => jwt.verify(token, JWT_SECRET),
};
