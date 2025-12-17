const express = require("express");
const router = express.Router();

const {
  findAllCategory_Rith,
  getCategoryById_Rith,
  createCategory_Rith,
  updateCategory_Rith,
  deleteCategory_Rith,
} = require("../controller/CategoryController");

router.get("/", findAllCategory_Rith);
router.get("/:id", getCategoryById_Rith);

router.post("/", createCategory_Rith);

router.put("/:id", updateCategory_Rith);

router.delete("/:id", deleteCategory_Rith);

module.exports = router;
