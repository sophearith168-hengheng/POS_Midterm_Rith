const User = require("../model/UserModel");
const AuthService = require("./AuthService");

class UserService {
  /**
   * Get all users
   */
  static async getAllUsers() {
    try {
      const users = await User.findAll();
      return {
        status: 200,
        message: "Success",
        data: users,
      };
    } catch (error) {
      throw {
        status: 500,
        message: error.message,
      };
    }
  }

  /**
   * Get user by ID
   */
  static async getUserById(id) {
    try {
      if (!Number.isInteger(Number(id)) || id <= 0) {
        return {
          status: 400,
          message: "Invalid user ID",
          data: null,
        };
      }

      const user = await User.findByPk(id);

      if (!user) {
        return {
          status: 404,
          message: "User not found",
          data: null,
        };
      }

      return {
        status: 200,
        message: "Success",
        data: user,
      };
    } catch (error) {
      throw {
        status: 500,
        message: error.message,
      };
    }
  }

  /**
   * Create a new user
   */
  static async createUser(userData) {
    try {
      const { Username, Userpass } = userData;

      if (!Username || !Userpass) {
        return {
          status: 400,
          message: "Username and password are required",
          data: null,
        };
      }

      // Check if username already exists
      const existingUser = await User.findOne({
        where: { Username },
      });

      if (existingUser) {
        return {
          status: 400,
          message: "Username already exists",
          data: null,
        };
      }

      // Hash password before saving
      const hashedPassword = AuthService.hashPassword(Userpass);

      const result = await User.create({
        Username,
        Userpass: hashedPassword,
      });

      return {
        status: 201,
        message: "User created successfully",
        data: {
          User_ID: result.User_ID,
          Username: result.Username,
        },
      };
    } catch (error) {
      throw {
        status: 500,
        message: error.message,
      };
    }
  }

  /**
   * Update user
   */
  static async updateUser(id, userData) {
    try {
      if (!Number.isInteger(Number(id)) || id <= 0) {
        return {
          status: 400,
          message: "Invalid user ID",
          data: null,
        };
      }

      // If updating password, hash it
      const updateData = { ...userData };
      if (updateData.Userpass) {
        updateData.Userpass = AuthService.hashPassword(updateData.Userpass);
      }

      const [updated] = await User.update(updateData, {
        where: { User_ID: id },
      });

      if (updated === 0) {
        return {
          status: 404,
          message: "User not found",
          data: null,
        };
      }

      const updatedUser = await User.findByPk(id);

      return {
        status: 200,
        message: "User updated successfully",
        data: {
          User_ID: updatedUser.User_ID,
          Username: updatedUser.Username,
        },
      };
    } catch (error) {
      throw {
        status: 500,
        message: error.message,
      };
    }
  }

  /**
   * Delete user
   */
  static async deleteUser(id) {
    try {
      if (!Number.isInteger(Number(id)) || id <= 0) {
        return {
          status: 400,
          message: "Invalid user ID",
          data: null,
        };
      }

      const deleted = await User.destroy({
        where: { User_ID: id },
      });

      if (deleted === 0) {
        return {
          status: 404,
          message: "User not found",
          data: null,
        };
      }

      return {
        status: 200,
        message: "User deleted successfully",
        data: { User_ID: id },
      };
    } catch (error) {
      throw {
        status: 500,
        message: error.message,
      };
    }
  }
}

module.exports = UserService;
