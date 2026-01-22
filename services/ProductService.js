const Product = require("../model/ProductModel");

class ProductService {
  /**
   * Get all products
   */
  static async getAllProducts() {
    try {
      const products = await Product.findAll();
      return {
        status: 200,
        message: "Success",
        data: products,
      };
    } catch (error) {
      throw {
        status: 500,
        message: error.message,
      };
    }
  }

  /**
   * Get product by ID
   */
  static async getProductById(id) {
    try {
      if (!Number.isInteger(Number(id)) || id <= 0) {
        return {
          status: 400,
          message: "Invalid product ID",
          data: null,
        };
      }

      const product = await Product.findByPk(id);

      if (!product) {
        return {
          status: 404,
          message: "Product not found",
          data: null,
        };
      }

      return {
        status: 200,
        message: "Success",
        data: product,
      };
    } catch (error) {
      throw {
        status: 500,
        message: error.message,
      };
    }
  }

  /**
   * Create a new product
   */
  static async createProduct(productData, imageFilename) {
    try {
      const { Product_Name, Qty, Price, Discount, Category_ID } = productData;

      // Validate required fields
      if (!Product_Name || !Qty || !Price || !Discount || !Category_ID) {
        return {
          status: 400,
          message: "All fields are required",
          data: null,
        };
      }

      if (!imageFilename) {
        return {
          status: 400,
          message: "Image is required",
          data: null,
        };
      }

      // Validate numeric fields
      if (isNaN(Qty) || isNaN(Price) || isNaN(Discount) || isNaN(Category_ID)) {
        return {
          status: 400,
          message: "Qty, Price, Discount, and Category_ID must be numeric",
          data: null,
        };
      }

      const result = await Product.create({
        Product_Name,
        Qty,
        Price,
        Discount,
        Category_ID,
        Image: imageFilename,
      });

      return {
        status: 201,
        message: "Product created successfully",
        data: result,
      };
    } catch (error) {
      throw {
        status: 500,
        message: error.message,
      };
    }
  }

  /**
   * Update product
   */
  static async updateProduct(id, productData, imageFilename = null) {
    try {
      if (!Number.isInteger(Number(id)) || id <= 0) {
        return {
          status: 400,
          message: "Invalid product ID",
          data: null,
        };
      }

      const updateData = { ...productData };

      // Only add image if provided
      if (imageFilename) {
        updateData.Image = imageFilename;
      }

      const [updated] = await Product.update(updateData, {
        where: { Product_ID: id },
      });

      if (updated === 0) {
        return {
          status: 404,
          message: "Product not found",
          data: null,
        };
      }

      const updatedProduct = await Product.findByPk(id);

      return {
        status: 200,
        message: "Product updated successfully",
        data: updatedProduct,
      };
    } catch (error) {
      throw {
        status: 500,
        message: error.message,
      };
    }
  }

  /**
   * Delete product
   */
  static async deleteProduct(id) {
    try {
      if (!Number.isInteger(Number(id)) || id <= 0) {
        return {
          status: 400,
          message: "Invalid product ID",
          data: null,
        };
      }

      const deleted = await Product.destroy({
        where: { Product_ID: id },
      });

      if (deleted === 0) {
        return {
          status: 404,
          message: "Product not found",
          data: null,
        };
      }

      return {
        status: 200,
        message: "Product deleted successfully",
        data: { Product_ID: id },
      };
    } catch (error) {
      throw {
        status: 500,
        message: error.message,
      };
    }
  }

  /**
   * Search products by name
   */
  static async searchProducts(searchTerm) {
    try {
      if (!searchTerm) {
        return {
          status: 400,
          message: "Search term is required",
          data: [],
        };
      }

      const products = await Product.findAll({
        where: {
          Product_Name: {
            [require("sequelize").Op.like]: `%${searchTerm}%`,
          },
        },
      });

      return {
        status: 200,
        message: "Success",
        data: products,
      };
    } catch (error) {
      throw {
        status: 500,
        message: error.message,
      };
    }
  }
}

module.exports = ProductService;
