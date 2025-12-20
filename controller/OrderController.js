const Order = require("../model/OrderModel");

// GET all orders
exports.findAllOrder_Rith = async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.status(200).json({
      message: "Orders retrieved successfully",
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve orders",
      error: error.message,
    });
  }
};

// GET order by ID
exports.findAllOrderID_Rith = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      message: "Order retrieved successfully",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve order",
      error: error.message,
    });
  }
};

// CREATE order
exports.createOrder_Rith = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json({
      message: "Order created successfully",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create order",
      error: error.message,
    });
  }
};

// UPDATE order
exports.UpdateOrder_Rith = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Order.update(req.body, { where: { Order_ID: id } });

    if (updated === 0) {
      return res
        .status(404)
        .json({ message: "Order not found or no changes made" });
    }

    const updatedOrder = await Order.findByPk(id);
    res.status(200).json({
      message: "Order updated successfully",
      data: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update order",
      error: error.message,
    });
  }
};

// DELETE order
exports.DeleteOrder_Rith = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Order.destroy({ where: { Order_ID: id } });

    if (deleted === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete order",
      error: error.message,
    });
  }
};
