const Order = require("../model/OrderModel");
const OrderService = require("../services/OrderService");

// GET all orders
exports.findAllOrder_Rith = async (req, res) => {
  try {
    const result = await OrderService.getAllOrders();
    res.status(result.status).json(result);
  } catch (error) {
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message,
    });
  }
};

// GET order by ID
exports.findAllOrderID_Rith = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await OrderService.getOrderById(id);
    res.status(result.status).json(result);
  } catch (error) {
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message,
    });
  }
};

// CREATE order
exports.createOrder_Rith = async (req, res) => {
  try {
    const result = await OrderService.createOrder(req.body);
    res.status(result.status).json(result);
  } catch (error) {
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message,
    });
  }
};

// UPDATE order
exports.UpdateOrder_Rith = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await OrderService.updateOrder(id, req.body);
    res.status(result.status).json(result);
  } catch (error) {
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message,
    });
  }
};

// DELETE order
exports.DeleteOrder_Rith = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await OrderService.deleteOrder(id);
    res.status(result.status).json(result);
  } catch (error) {
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message,
    });
  }
};
