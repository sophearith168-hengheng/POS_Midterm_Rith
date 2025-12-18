const OrderDetail = require("../model/OrderDetail");

exports.findAllOrderDetail_Rith = async (req, res) => {
  try {
    const orderDetail = await OrderDetail.findAll();
    res.status(200).json(orderDetail);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.findAllOrderDetailID_Rith = async (req, res) => {
  try {
    const { id } = req.params;
    const orderDetail = await OrderDetail.findByPk(id);
    res.status(200).json(orderDetail);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
