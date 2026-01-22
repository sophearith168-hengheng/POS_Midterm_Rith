const OrderDetail = require("../model/OrderDetail");
const OrderDetailService = require("../services/OrderDetailService");

exports.findAllOrderDetail_Rith = async (req, res) => {
  try {
    const result = await OrderDetailService.getAllOrderDetails();
    res.status(result.status).json(result);
  } catch (error) {
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message,
    });
  }
};

exports.findAllOrderDetailID_Rith = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await OrderDetailService.getOrderDetailById(id);
    res.status(result.status).json(result);
  } catch (error) {
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message,
    });
  }
};

exports.createOrderDetail_Rith = async (req, res) => {
  try {
    const result = await OrderDetailService.createOrderDetail(req.body);
    res.status(result.status).json(result);
  } catch (error) {
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message,
    });
  }
};

exports.UpdateOrderDetail_Rith = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await OrderDetailService.updateOrderDetail(id, req.body);
    res.status(result.status).json(result);
  } catch (error) {
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message,
    });
  }
};

exports.DeleteOrderDetail_Rith = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await OrderDetailService.deleteOrderDetail(id);
    res.status(result.status).json(result);
  } catch (error) {
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message,
    });
  }
};
