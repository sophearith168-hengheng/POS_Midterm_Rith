const OrderDetail = require("../model/OrderDetail");

exports.findAllOrderDetail_Rith = async (req, res) => {
  try {
    const orderDetails = await OrderDetail.findAll();
    let result_data = {
      status: 200,
      message: "Success",
      data: orderDetails,
    };
    res.json(result_data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.findAllOrderDetailID_Rith = async (req, res) => {
  try {
    const { id } = req.params;
    if (!Number.isInteger(Number(id)) || id <= 0) {
      return res.status(400).json({ error: "Invalid order detail ID" });
    }
    const orderDetail = await OrderDetail.findByPk(id);
    let result_data = {
      status: 200,
      message: "Success",
      data: orderDetail,
    };
    res.json(result_data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createOrderDetail_Rith = async (req, res) => {
  try {
    const orderDetail = await OrderDetail.create(req.body);
    let result_data = {
      status: 201,
      message: "Success",
      data: orderDetail,
    };
    res.status(201).json(result_data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.UpdateOrderDetail_Rith = async (req, res) => {
  try {
    const { id } = req.params;
    if (!Number.isInteger(Number(id)) || id <= 0) {
      return res.status(400).json({ error: "Invalid order detail ID" });
    }
    const [updated] = await OrderDetail.update(req.body, {
      where: { Odid: id },
    });

    if (updated === 0) {
      return res.status(404).json({
        message: "Order detail not found",
      });
    }

    const updatedOrderDetail = await OrderDetail.findOne({
      where: { Odid: id },
    });

    res.status(200).json({
      status: 200,
      message: "Order detail updated successfully",
      data: updatedOrderDetail,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.DeleteOrderDetail_Rith = async (req, res) => {
  try {
    const { id } = req.params;
    if (!Number.isInteger(Number(id)) || id <= 0) {
      return res.status(400).json({ error: "Invalid order detail ID" });
    }
    const deleted = await OrderDetail.destroy({
      where: { Odid: id },
    });

    if (deleted === 0) {
      return res.status(404).json({
        message: "Order detail not found",
      });
    }

    res.status(200).json({
      status: 200,
      message: "Order detail deleted successfully",
      data: { Odid: id },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
