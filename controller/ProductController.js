const Product = require("../model/ProductModel");

exports.findAllProduct_Rith = async (req, res) => {
  try {
    const products = await Product.findAll();
    let result_data = {
      status: 200,
      message: "Success",
      data: products,
    };
    res.json(result_data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.findProductById_Rith = async (req, res) => {
  try {
    const { id } = req.params;
    if (!Number.isInteger(Number(id)) || id <= 0) {
      return res.status(400).json({ error: "Invalid product ID" });
    }
    const result = await Product.findByPk(id);
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

exports.createProduct_Rith = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: 400,
        message: "Image is required",
      });
    }

    const { Product_Name, Qty, Price, Discount, Category_ID } = req.body;

    const result = await Product.create({
      Product_Name,
      Qty,
      Price,
      Discount,
      Category_ID,
      Product_Img: req.file.filename,
    });

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

exports.UpdateProduct_Rith = async (req, res) => {
  try {
    const { id } = req.params;
    if (!Number.isInteger(Number(id)) || id <= 0) {
      return res.status(400).json({ error: "Invalid product ID" });
    }
    const updateData = { ...req.body };
    if (req.file) {
      updateData.Product_Img = req.file.filename;
    }
    const [updated] = await Product.update(updateData, {
      where: { Product_ID: id },
    });

    if (updated === 0) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const updatedProduct = await Product.findOne({
      where: { Product_ID: id },
    });

    res.status(200).json({
      status: 200,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.DeleteProduct_Rith = async (req, res) => {
  try {
    const { id } = req.params;
    if (!Number.isInteger(Number(id)) || id <= 0) {
      return res.status(400).json({ error: "Invalid product ID" });
    }
    const deleted = await Product.destroy({
      where: { Product_ID: id },
    });

    if (deleted === 0) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      status: 200,
      message: "Product deleted successfully",
      data: { Product_ID: id },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
