const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/authMiddleware");

const {
  registerUser,
  loginUser,
  findAllUser_Rith,
  findUserById_Rith,
  createUser_Rith,
  UpdateUser_Rith,
  DeleteUser_Rith,
} = require("../controller/UserController");

// Public authentication endpoints
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected endpoints
router.get("/", authMiddleware, findAllUser_Rith);
router.get("/:id", authMiddleware, findUserById_Rith);
router.post("/admin", authMiddleware, createUser_Rith);
router.put("/:id", authMiddleware, UpdateUser_Rith);
router.delete("/:id", authMiddleware, DeleteUser_Rith);

module.exports = router;
