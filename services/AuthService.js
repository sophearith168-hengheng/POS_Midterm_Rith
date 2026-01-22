const User = require("../model/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-in-production";

class AuthService {
  /**
   * Register new user with hashed password
   */
  static async register(User_Name, User_Email, User_Password, User_Phone) {
    try {
      if (!User_Name || !User_Email || !User_Password) {
        return {
          success: false,
          status: 400,
          message: "Name, email, and password are required",
          data: null,
        };
      }

      const existingUser = await User.findOne({
        where: { User_Email },
      });

      if (existingUser) {
        return {
          success: false,
          status: 409,
          message: "User with this email already exists",
          data: null,
        };
      }

      const hashedPassword = await bcrypt.hash(User_Password, 10);

      const user = await User.create({
        User_Name,
        User_Email,
        User_Password: hashedPassword,
        User_Phone,
      });

      const token = this.generateToken({
        User_ID: user.User_ID,
        User_Email: user.User_Email,
      });

      return {
        success: true,
        status: 201,
        message: "User registered successfully",
        data: {
          User_ID: user.User_ID,
          User_Name: user.User_Name,
          User_Email: user.User_Email,
        },
        token,
      };
    } catch (error) {
      return {
        success: false,
        status: 500,
        message: "Registration failed",
        error: error.message,
      };
    }
  }

  /**
   * Login user with email and password
   */
  static async login(User_Email, User_Password) {
    try {
      if (!User_Email || !User_Password) {
        return {
          success: false,
          status: 400,
          message: "Email and password are required",
          data: null,
        };
      }

      const user = await User.findOne({
        where: { User_Email },
      });

      if (!user) {
        return {
          success: false,
          status: 401,
          message: "Invalid email or password",
          data: null,
        };
      }

      const passwordMatch = await bcrypt.compare(
        User_Password,
        user.User_Password,
      );

      if (!passwordMatch) {
        return {
          success: false,
          status: 401,
          message: "Invalid email or password",
          data: null,
        };
      }

      const token = this.generateToken({
        User_ID: user.User_ID,
        User_Email: user.User_Email,
      });

      return {
        success: true,
        status: 200,
        message: "Login successful",
        data: {
          User_ID: user.User_ID,
          User_Name: user.User_Name,
          User_Email: user.User_Email,
        },
        token,
      };
    } catch (error) {
      return {
        success: false,
        status: 500,
        message: "Login failed",
        error: error.message,
      };
    }
  }

  /**
   * Generate JWT token
   */
  static generateToken(payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
  }

  /**
   * Verify JWT token
   */
  static verifyToken(token) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return null;
    }
  }

  /**
   * Hash password with bcrypt
   */
  static async hashPassword(password) {
    return await bcrypt.hash(password, 10);
  }

  /**
   * Verify password
   */
  static async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = AuthService;
