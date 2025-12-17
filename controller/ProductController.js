const Product = require("../model/ProductModel");

exports.findAllProduct_Rith = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.findProductById_Rith = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Product.findByPk(id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createProduct_Rith = async (req, res) => {
  try {
    const {
      Product_Rith_Name,
      Qty_Rith,
      Price_Rith,
      Discount_Rith,
      Category_Rith_ID,
    } = req.body;

    const result = await Product.create({
      Product_Rith_Name,
      Qty_Rith,
      Price_Rith,
      Discount_Rith,
      Category_Rith_ID,
    });

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.UpdateProduct_Rith = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Product.update(req.body, {
      where: { ProductID: id },
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.DeleteProduct_Rith = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Product.destroy({
      where: { ProductID: id },
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
