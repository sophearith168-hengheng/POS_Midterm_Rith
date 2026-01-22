const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/authMiddleware");

const {
  findAllOrder_Rith,
  findAllOrderID_Rith,
  createOrder_Rith,
  UpdateOrder_Rith,
  DeleteOrder_Rith,
} = require("../controller/OrderController");

// Protected endpoints
router.get("/", authMiddleware, findAllOrder_Rith);
router.get("/:id", authMiddleware, findAllOrderID_Rith);
router.post("/", authMiddleware, createOrder_Rith);
router.put("/:id", authMiddleware, UpdateOrder_Rith);
router.delete("/:id", authMiddleware, DeleteOrder_Rith);

module.exports = router;
