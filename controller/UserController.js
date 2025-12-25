const User = require("../model/UserModel");

exports.findAllUser_Rith = async (req, res) => {
  try {
    const users = await User.findAll();
    let result_data = {
      status: 200,
      message: "Success",
      data: users,
    };
    res.json(result_data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.findUserById_Rith = async (req, res) => {
  try {
    const { id } = req.params;
    if (!Number.isInteger(Number(id)) || id <= 0) {
      return res.status(400).json({ error: "Invalid user ID" });
    }
    const result = await User.findByPk(id);
    let result_data = {
      status: 200,
      message: "Success",
      data: result,
    };
    res.json(result_data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createUser_Rith = async (req, res) => {
  try {
    const result = await User.create(req.body);
    let result_data = {
      status: 201,
      message: "Success",
      data: result,
    };
    res.status(201).json(result_data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.UpdateUser_Rith = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await User.update(req.body, {
      where: { User_ID: id },
    });

    if (updated === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const updatedUser = await User.findOne({
      where: { User_ID: id },
    });

    res.status(200).json({
      status: 200,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.DeleteUser_Rith = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.destroy({
      where: { User_ID: id },
    });

    if (deleted === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      status: 200,
      message: "User deleted successfully",
      data: { User_ID: id },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
