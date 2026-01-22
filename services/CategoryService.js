const Category = require("../model/CategoryModel");

class CategoryService {
  /**
   * Get all categories
   */
  static async getAllCategories() {
    try {
      const categories = await Category.findAll();
      return {
        status: 200,
        message: "Success",
        data: categories,
      };
    } catch (error) {
      throw {
        status: 500,
        message: error.message,
      };
    }
  }

  /**
   * Get category by ID
   */
  static async getCategoryById(id) {
    try {
      if (!Number.isInteger(Number(id)) || id <= 0) {
        return {
          status: 400,
          message: "Invalid category ID",
          data: null,
        };
      }

      const category = await Category.findByPk(id);

      if (!category) {
        return {
          status: 404,
          message: "Category not found",
          data: null,
        };
      }

      return {
        status: 200,
        message: "Success",
        data: category,
      };
    } catch (error) {
      throw {
        status: 500,
        message: error.message,
      };
    }
  }

  /**
   * Create new category
   */
  static async createCategory(categoryData) {
    try {
      const { Category_Name } = categoryData;

      if (!Category_Name) {
        return {
          status: 400,
          message: "Category_Name is required",
          data: null,
        };
      }

      const existingCategory = await Category.findOne({
        where: { Category_Name },
      });

      if (existingCategory) {
        return {
          status: 409,
          message: "Category already exists",
          data: existingCategory,
        };
      }

      const category = await Category.create(categoryData);

      return {
        status: 201,
        message: "Category created successfully",
        data: category,
      };
    } catch (error) {
      throw {
        status: 500,
        message: error.message,
      };
    }
  }

  /**
   * Update category
   */
  static async updateCategory(id, categoryData) {
    try {
      if (!Number.isInteger(Number(id)) || id <= 0) {
        return {
          status: 400,
          message: "Invalid category ID",
          data: null,
        };
      }

      const [updated] = await Category.update(categoryData, {
        where: { Category_ID: id },
      });

      if (updated === 0) {
        return {
          status: 404,
          message: "Category not found",
          data: null,
        };
      }

      const updatedCategory = await Category.findByPk(id);

      return {
        status: 200,
        message: "Category updated successfully",
        data: updatedCategory,
      };
    } catch (error) {
      throw {
        status: 500,
        message: error.message,
      };
    }
  }

  /**
   * Delete category
   */
  static async deleteCategory(id) {
    try {
      if (!Number.isInteger(Number(id)) || id <= 0) {
        return {
          status: 400,
          message: "Invalid category ID",
          data: null,
        };
      }

      const deleted = await Category.destroy({
        where: { Category_ID: id },
      });

      if (deleted === 0) {
        return {
          status: 404,
          message: "Category not found",
          data: null,
        };
      }

      return {
        status: 200,
        message: "Category deleted successfully",
        data: { Category_ID: id },
      };
    } catch (error) {
      throw {
        status: 500,
        message: error.message,
      };
    }
  }
}

module.exports = CategoryService;
