const Order = require("../model/OrderModel");

exports.findAllOrder_Rith = async (req, res) => {
  try {
    const order = await Order.findAll();
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.findAllOrderID_Rith = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createOrder_Rith = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.UpdateOrder_Rith = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Order.update(req.body, {
      where: { OrderID: id },
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.DeleteOrder_Rith = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Order.destroy({
      where: { OrderID: id },
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
