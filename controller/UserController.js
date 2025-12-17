const User = require("../model/UserModel");

exports.findAllUser_Rith = async (req, res) => {
  try {
    const result = await User.findAll();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.findUserById_Rith = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await User.findByPk(id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createUser_Rith = async (req, res) => {
  try {
    const result = await User.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.UpdateUser_Rith = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await User.update(req.body, {
      where: { UserID: id },
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.DeleteUser_Rith = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await User.destroy({
      where: { UserID: id },
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
