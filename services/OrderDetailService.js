const OrderDetail = require("../model/OrderDetail");

class OrderDetailService {
  /**
   * Get all order details
   */
  static async getAllOrderDetails() {
    try {
      const orderDetails = await OrderDetail.findAll();
      return {
        status: 200,
        message: "Success",
        data: orderDetails,
      };
    } catch (error) {
      throw {
        status: 500,
        message: error.message,
      };
    }
  }

  /**
   * Get order detail by ID
   */
  static async getOrderDetailById(id) {
    try {
      if (!Number.isInteger(Number(id)) || id <= 0) {
        return {
          status: 400,
          message: "Invalid order detail ID",
          data: null,
        };
      }

      const orderDetail = await OrderDetail.findByPk(id);

      if (!orderDetail) {
        return {
          status: 404,
          message: "Order detail not found",
          data: null,
        };
      }

      return {
        status: 200,
        message: "Success",
        data: orderDetail,
      };
    } catch (error) {
      throw {
        status: 500,
        message: error.message,
      };
    }
  }

  /**
   * Create new order detail
   */
  static async createOrderDetail(orderDetailData) {
    try {
      const { Order_ID, Product_ID, Quantity, Price } = orderDetailData;

      if (!Order_ID || !Product_ID || !Quantity || !Price) {
        return {
          status: 400,
          message: "Order_ID, Product_ID, Quantity, and Price are required",
          data: null,
        };
      }

      const orderDetail = await OrderDetail.create(orderDetailData);

      return {
        status: 201,
        message: "Order detail created successfully",
        data: orderDetail,
      };
    } catch (error) {
      throw {
        status: 500,
        message: error.message,
      };
    }
  }

  /**
   * Update order detail
   */
  static async updateOrderDetail(id, orderDetailData) {
    try {
      if (!Number.isInteger(Number(id)) || id <= 0) {
        return {
          status: 400,
          message: "Invalid order detail ID",
          data: null,
        };
      }

      const [updated] = await OrderDetail.update(orderDetailData, {
        where: { Odid: id },
      });

      if (updated === 0) {
        return {
          status: 404,
          message: "Order detail not found",
          data: null,
        };
      }

      const updatedOrderDetail = await OrderDetail.findByPk(id);

      return {
        status: 200,
        message: "Order detail updated successfully",
        data: updatedOrderDetail,
      };
    } catch (error) {
      throw {
        status: 500,
        message: error.message,
      };
    }
  }

  /**
   * Delete order detail
   */
  static async deleteOrderDetail(id) {
    try {
      if (!Number.isInteger(Number(id)) || id <= 0) {
        return {
          status: 400,
          message: "Invalid order detail ID",
          data: null,
        };
      }

      const deleted = await OrderDetail.destroy({
        where: { Odid: id },
      });

      if (deleted === 0) {
        return {
          status: 404,
          message: "Order detail not found",
          data: null,
        };
      }

      return {
        status: 200,
        message: "Order detail deleted successfully",
        data: { Odid: id },
      };
    } catch (error) {
      throw {
        status: 500,
        message: error.message,
      };
    }
  }
}

module.exports = OrderDetailService;
