const Product = require("../model/ProductModel");
const ProductService = require("../services/ProductService");

exports.findAllProduct_Rith = async (req, res) => {
  try {
    const result = await ProductService.getAllProducts();
    res.status(result.status).json(result);
  } catch (error) {
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message,
    });
  }
};

exports.findProductById_Rith = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await ProductService.getProductById(id);
    res.status(result.status).json(result);
  } catch (error) {
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message,
    });
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

    if (!Product_Name || !Qty || !Price || !Category_ID) {
      return res.status(400).json({
        status: 400,
        message: "Product_Name, Qty, Price, and Category_ID are required",
      });
    }

    const productData = {
      Product_Name,
      Qty,
      Price,
      Discount,
      Category_ID,
      Product_Img: req.file.filename,
    };

    const result = await ProductService.createProduct(productData);
    res.status(result.status).json(result);
  } catch (error) {
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message,
    });
  }
};

exports.UpdateProduct_Rith = async (req, res) => {
  try {
    const { id } = req.params;

    const updateData = { ...req.body };
    if (req.file) {
      updateData.Product_Img = req.file.filename;
    }

    const result = await ProductService.updateProduct(id, updateData);
    res.status(result.status).json(result);
  } catch (error) {
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message,
    });
  }
};

exports.DeleteProduct_Rith = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await ProductService.deleteProduct(id);
    res.status(result.status).json(result);
  } catch (error) {
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message,
    });
  }
};
