const express = require("express");
const router = express.Router();

const {
  findAllUser_Rith,
  findUserById_Rith,
  createUser_Rith,
  UpdateUser_Rith,
  DeleteUser_Rith,
} = require("../controller/UserController");

router.get("/", findAllUser_Rith);
router.get("/:id", findUserById_Rith);

router.post("/", createUser_Rith);

router.put("/:id", UpdateUser_Rith);

router.delete("/:id", DeleteUser_Rith);

module.exports = router;
