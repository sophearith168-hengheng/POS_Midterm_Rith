const express = require("express");
const router = express.Router();

const {
  findAllOrder_Rith,
  findAllOrderID_Rith,
  createOrder_Rith,
  UpdateOrder_Rith,
  DeleteOrder_Rith,
} = require("../controller/OrderController");

router.get("/", findAllOrder_Rith);
router.get("/:id", findAllOrderID_Rith);

router.post("/", createOrder_Rith);

router.put("/:id", UpdateOrder_Rith);

router.delete("/:id", DeleteOrder_Rith);

module.exports = router;
