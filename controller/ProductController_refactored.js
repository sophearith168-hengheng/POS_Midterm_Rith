const ProductService = require("../services/ProductService");

/**
 * Get all products
 */
exports.findAllProduct_Rith = async (req, res) => {
  try {
    const result = await ProductService.getAllProducts();
    res.status(result.status).json(result);
  } catch (error) {
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message,
      data: null,
    });
  }
};

/**
 * Get product by ID
 */
exports.findProductById_Rith = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await ProductService.getProductById(id);
    res.status(result.status).json(result);
  } catch (error) {
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message,
      data: null,
    });
  }
};

/**
 * Create product
 */
exports.createProduct_Rith = async (req, res) => {
  try {
    const { Product_Name, Qty, Price, Discount, Category_ID } = req.body;
    const imageFilename = req.file?.filename;

    const result = await ProductService.createProduct(
      { Product_Name, Qty, Price, Discount, Category_ID },
      imageFilename,
    );

    res.status(result.status).json(result);
  } catch (error) {
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message,
      data: null,
    });
  }
};

/**
 * Update product
 */
exports.updateProduct_Rith = async (req, res) => {
  try {
    const { id } = req.params;
    const imageFilename = req.file?.filename;

    const result = await ProductService.updateProduct(
      id,
      req.body,
      imageFilename,
    );
    res.status(result.status).json(result);
  } catch (error) {
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message,
      data: null,
    });
  }
};

/**
 * Delete product
 */
exports.deleteProduct_Rith = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await ProductService.deleteProduct(id);
    res.status(result.status).json(result);
  } catch (error) {
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message,
      data: null,
    });
  }
};

/**
 * Search products
 */
exports.searchProducts = async (req, res) => {
  try {
    const { search } = req.query;
    const result = await ProductService.searchProducts(search);
    res.status(result.status).json(result);
  } catch (error) {
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message,
      data: null,
    });
  }
};
