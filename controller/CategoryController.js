const Category = require("../model/CategoryModel");

exports.findAllCategory_Rith = async (req, res) => {
  try {
    const categories = await Category.findAll();
    let result_data = {
      status: 200,
      message: "Success",
      data: categories,
    };
    res.status(200).json(result_data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCategoryById_Rith = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    let result_data = {
      status: 200,
      message: "Success",
      data: category,
    };

    res.status(200).json(result_data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createCategory_Rith = async (req, res) => {
  try {
    const category = await Category.create(req.body);

    res.status(201).json({
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create category",
      error: error.message,
    });
  }
};

exports.updateCategory_Rith = async (req, res) => {
  try {
    const { id } = req.params;

    const [updated] = await Category.update(req.body, {
      where: { Category_ID: id },
    });

    if (updated === 0) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    const updatedCategory = await Category.findOne({
      where: { Category_ID: id },
    });

    res.status(200).json({
      message: "Category updated successfully",
      data: updatedCategory,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update category",
      error: error.message,
    });
  }
};

exports.deleteCategory_Rith = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Category.destroy({
      where: { Category_ID: id },
    });

    if (deleted === 0) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.status(204).send({
      message: "Category deleted successfully",
      data: {
        Category_ID: id,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete category",
      error: error.message,
    });
  }
};
