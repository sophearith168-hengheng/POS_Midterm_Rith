const Category = require("../model/CategoryModel");

exports.findAllCategory_Rith = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
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
    // category.destroy();

    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createCategory_Rith = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCategory_Rith = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("ID received:", id);
    console.log("Body received:", req.body);

    const [updated] = await Category.update(req.body, {
      where: { CategoryID: id },
    });

    console.log("Update result:", updated);

    if (updated === 0) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json({ message: "Category updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCategory_Rith = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Category.destroy({
      where: { CategoryID: id },
    });

    if (deleted === 0) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
