const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const {
  authMiddleware,
  optionalAuthMiddleware,
} = require("../middlewares/authMiddleware");

const {
  findAllProduct_Rith,
  findProductById_Rith,
  createProduct_Rith,
  UpdateProduct_Rith,
  DeleteProduct_Rith,
} = require("../controller/ProductController");

// Public endpoints
router.get("/", findAllProduct_Rith);
router.get("/:id", findProductById_Rith);

// Protected endpoints
router.post(
  "/",
  authMiddleware,
  upload.single("Product_Img"),
  createProduct_Rith,
);
router.put(
  "/:id",
  authMiddleware,
  upload.single("Product_Img"),
  UpdateProduct_Rith,
);
router.delete("/:id", authMiddleware, DeleteProduct_Rith);

module.exports = router;
