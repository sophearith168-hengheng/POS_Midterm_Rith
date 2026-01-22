const User = require("../model/UserModel");
const AuthService = require("../services/AuthService");
const UserService = require("../services/UserService");

// Register new user
exports.registerUser = async (req, res) => {
  try {
    const { User_Name, User_Email, User_Password, User_Phone } = req.body;

    const result = await AuthService.register(
      User_Name,
      User_Email,
      User_Password,
      User_Phone,
    );

    if (!result.success) {
      return res.status(result.status).json({
        status: result.status,
        message: result.message,
        data: result.data,
      });
    }

    res.status(result.status).json({
      status: result.status,
      message: result.message,
      data: result.data,
      token: result.token,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Registration failed",
      error: error.message,
    });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  try {
    const { User_Email, User_Password } = req.body;

    const result = await AuthService.login(User_Email, User_Password);

    if (!result.success) {
      return res.status(result.status).json({
        status: result.status,
        message: result.message,
        data: result.data,
      });
    }

    res.status(result.status).json({
      status: result.status,
      message: result.message,
      data: result.data,
      token: result.token,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Login failed",
      error: error.message,
    });
  }
};

exports.findAllUser_Rith = async (req, res) => {
  try {
    const result = await UserService.getAllUsers();
    res.status(result.status).json(result);
  } catch (error) {
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message,
    });
  }
};

exports.findUserById_Rith = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await UserService.getUserById(id);
    res.status(result.status).json(result);
  } catch (error) {
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message,
    });
  }
};

exports.createUser_Rith = async (req, res) => {
  try {
    const { User_Password } = req.body;
    const userData = { ...req.body };

    // Hash password if provided
    if (User_Password) {
      userData.User_Password = await AuthService.hashPassword(User_Password);
    }

    const result = await UserService.createUser(userData);
    res.status(result.status).json(result);
  } catch (error) {
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message,
    });
  }
};

exports.UpdateUser_Rith = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await UserService.updateUser(id, req.body);
    res.status(result.status).json(result);
  } catch (error) {
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message,
    });
  }
};

exports.DeleteUser_Rith = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await UserService.deleteUser(id);
    res.status(result.status).json(result);
  } catch (error) {
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message,
    });
  }
};
