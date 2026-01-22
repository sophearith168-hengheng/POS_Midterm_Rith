const Order = require("../model/OrderModel");

class OrderService {
  /**
   * Get all orders
   */
  static async getAllOrders() {
    try {
      const orders = await Order.findAll();
      return {
        status: 200,
        message: "Success",
        data: orders,
      };
    } catch (error) {
      throw {
        status: 500,
        message: error.message,
      };
    }
  }

  /**
   * Get order by ID
   */
  static async getOrderById(id) {
    try {
      if (!Number.isInteger(Number(id)) || id <= 0) {
        return {
          status: 400,
          message: "Invalid order ID",
          data: null,
        };
      }

      const order = await Order.findByPk(id);

      if (!order) {
        return {
          status: 404,
          message: "Order not found",
          data: null,
        };
      }

      return {
        status: 200,
        message: "Success",
        data: order,
      };
    } catch (error) {
      throw {
        status: 500,
        message: error.message,
      };
    }
  }

  /**
   * Create new order
   */
  static async createOrder(orderData) {
    try {
      const { User_ID, Total_Price } = orderData;

      if (!User_ID || !Total_Price) {
        return {
          status: 400,
          message: "User_ID and Total_Price are required",
          data: null,
        };
      }

      const order = await Order.create(orderData);

      return {
        status: 201,
        message: "Order created successfully",
        data: order,
      };
    } catch (error) {
      throw {
        status: 500,
        message: error.message,
      };
    }
  }

  /**
   * Update order
   */
  static async updateOrder(id, orderData) {
    try {
      if (!Number.isInteger(Number(id)) || id <= 0) {
        return {
          status: 400,
          message: "Invalid order ID",
          data: null,
        };
      }

      const [updated] = await Order.update(orderData, {
        where: { Order_ID: id },
      });

      if (updated === 0) {
        return {
          status: 404,
          message: "Order not found",
          data: null,
        };
      }

      const updatedOrder = await Order.findByPk(id);

      return {
        status: 200,
        message: "Order updated successfully",
        data: updatedOrder,
      };
    } catch (error) {
      throw {
        status: 500,
        message: error.message,
      };
    }
  }

  /**
   * Delete order
   */
  static async deleteOrder(id) {
    try {
      if (!Number.isInteger(Number(id)) || id <= 0) {
        return {
          status: 400,
          message: "Invalid order ID",
          data: null,
        };
      }

      const deleted = await Order.destroy({
        where: { Order_ID: id },
      });

      if (deleted === 0) {
        return {
          status: 404,
          message: "Order not found",
          data: null,
        };
      }

      return {
        status: 200,
        message: "Order deleted successfully",
        data: { Order_ID: id },
      };
    } catch (error) {
      throw {
        status: 500,
        message: error.message,
      };
    }
  }
}

module.exports = OrderService;
