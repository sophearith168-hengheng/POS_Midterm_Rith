const express = require("express");
const router = express.Router();

const {
  findAllProduct_Rith,
  findProductById_Rith,
  createProduct_Rith,
  UpdateProduct_Rith,
  DeleteProduct_Rith,
} = require("../controller/ProductController");

router.get("/", findAllProduct_Rith);
router.get("/:id", findProductById_Rith);

router.post("/", createProduct_Rith);

router.put("/:id", UpdateProduct_Rith);

router.delete("/:id", DeleteProduct_Rith);

module.exports = router;
