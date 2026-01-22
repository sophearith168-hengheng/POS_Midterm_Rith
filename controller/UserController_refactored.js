const UserService = require("../services/UserService");
const AuthService = require("../services/AuthService");

/**
 * Get all users
 */
exports.findAllUser_Rith = async (req, res) => {
  try {
    const result = await UserService.getAllUsers();
    res.status(result.status).json(result);
  } catch (error) {
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message,
      data: null,
    });
  }
};

/**
 * Get user by ID
 */
exports.findUserById_Rith = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await UserService.getUserById(id);
    res.status(result.status).json(result);
  } catch (error) {
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message,
      data: null,
    });
  }
};

/**
 * Create a new user
 */
exports.createUser_Rith = async (req, res) => {
  try {
    const result = await UserService.createUser(req.body);
    res.status(result.status).json(result);
  } catch (error) {
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message,
      data: null,
    });
  }
};

/**
 * Update user
 */
exports.UpdateUser_Rith = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await UserService.updateUser(id, req.body);
    res.status(result.status).json(result);
  } catch (error) {
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message,
      data: null,
    });
  }
};

/**
 * Delete user
 */
exports.DeleteUser_Rith = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await UserService.deleteUser(id);
    res.status(result.status).json(result);
  } catch (error) {
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message,
      data: null,
    });
  }
};

/**
 * User login
 */
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const result = await AuthService.authenticate(username, password);

    if (!result.success) {
      return res.status(401).json({
        status: 401,
        message: result.message,
        data: null,
      });
    }

    // Set secure cookie with user ID
    res.cookie("userId", result.data.User_ID, {
      httpOnly: true,
      maxAge: 3600000, // 1 hour
    });

    res.status(200).json({
      status: 200,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
      data: null,
    });
  }
};

/**
 * User registration
 */
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const result = await AuthService.registerUser(username, password);

    if (!result.success) {
      return res.status(400).json({
        status: 400,
        message: result.message,
        data: null,
      });
    }

    res.status(201).json({
      status: 201,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
      data: null,
    });
  }
};

/**
 * User logout
 */
exports.logout = async (req, res) => {
  try {
    res.clearCookie("userId");
    res.status(200).json({
      status: 200,
      message: "Logged out successfully",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
      data: null,
    });
  }
};
