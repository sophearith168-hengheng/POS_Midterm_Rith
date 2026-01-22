const Category = require("../model/CategoryModel");
const CategoryService = require("../services/CategoryService");

exports.findAllCategory_Rith = async (req, res) => {
  try {
    const result = await CategoryService.getAllCategories();
    res.status(result.status).json(result);
  } catch (error) {
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message,
    });
  }
};

exports.getCategoryById_Rith = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await CategoryService.getCategoryById(id);
    res.status(result.status).json(result);
  } catch (error) {
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message,
    });
  }
};

exports.createCategory_Rith = async (req, res) => {
  try {
    const result = await CategoryService.createCategory(req.body);
    res.status(result.status).json(result);
  } catch (error) {
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message,
    });
  }
};

exports.updateCategory_Rith = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await CategoryService.updateCategory(id, req.body);
    res.status(result.status).json(result);
  } catch (error) {
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message,
    });
  }
};

exports.deleteCategory_Rith = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await CategoryService.deleteCategory(id);
    res.status(result.status).json(result);
  } catch (error) {
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message,
    });
  }
};
