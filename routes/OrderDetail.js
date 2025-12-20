const express = require("express");
const router = express.Router();

const {
  findAllOrderDetail_Rith,
  findAllOrderDetailID_Rith,
  createOrderDetail_Rith,
  UpdateOrderDetail_Rith,
  DeleteOrderDetail_Rith,
} = require("../controller/OrderDetailController");

router.get("/", findAllOrderDetail_Rith);
router.get("/:id", findAllOrderDetailID_Rith);

router.post("/", createOrderDetail_Rith);

router.put("/:id", UpdateOrderDetail_Rith);

router.delete("/:id", DeleteOrderDetail_Rith);

module.exports = router;
