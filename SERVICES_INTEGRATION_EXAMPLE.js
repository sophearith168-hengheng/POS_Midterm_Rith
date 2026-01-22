/**
 * Example: How to Use Services in Your Routes
 * This file demonstrates the integration pattern for the new service layer
 */

const express = require("express");
const router = express.Router();
const UserController = require("../controller/UserController_refactored");
const ProductController = require("../controller/ProductController_refactored");
const upload = require("../middlewares/upload");
const {
  authMiddleware,
  optionalAuthMiddleware,
} = require("../middlewares/authMiddleware");

/**
 * USER ROUTES WITH AUTHENTICATION
 */

// Authentication endpoints (public)
router.post("/login", UserController.login);
router.post("/register", UserController.register);
router.post("/logout", UserController.logout);

// Protected user endpoints - require authentication
router.get("/", authMiddleware, UserController.findAllUser_Rith);
router.get("/:id", authMiddleware, UserController.findUserById_Rith);
router.post("/", authMiddleware, UserController.createUser_Rith);
router.put("/:id", authMiddleware, UserController.UpdateUser_Rith);
router.delete("/:id", authMiddleware, UserController.DeleteUser_Rith);

/**
 * PRODUCT ROUTES WITH OPTIONAL AUTHENTICATION
 */

// Public product endpoints
router.get("/", optionalAuthMiddleware, ProductController.findAllProduct_Rith);
router.get(
  "/:id",
  optionalAuthMiddleware,
  ProductController.findProductById_Rith,
);
router.get("/search/query", ProductController.searchProducts);

// Protected product endpoints - require authentication
router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  ProductController.createProduct_Rith,
);
router.put(
  "/:id",
  authMiddleware,
  upload.single("image"),
  ProductController.updateProduct_Rith,
);
router.delete("/:id", authMiddleware, ProductController.deleteProduct_Rith);

/**
 * EXAMPLE CURL COMMANDS
 */

/*

// 1. REGISTER NEW USER
curl -X POST http://localhost:3000/user/register \
  -H "Content-Type: application/json" \
  -d {
    "username": "john_doe",
    "password": "password123"
  }

// 2. LOGIN USER (sets cookie automatically)
curl -X POST http://localhost:3000/user/login \
  -H "Content-Type: application/json" \
  -d {
    "username": "john_doe",
    "password": "password123"
  }

// 3. GET ALL USERS (protected - requires authentication)
curl -X GET http://localhost:3000/user/ \
  -H "x-user-id: 1"

// 4. GET USER BY ID (protected)
curl -X GET http://localhost:3000/user/1 \
  -H "x-user-id: 1"

// 5. CREATE USER (protected)
curl -X POST http://localhost:3000/user/ \
  -H "Content-Type: application/json" \
  -H "x-user-id: 1" \
  -d {
    "Username": "jane_doe",
    "Userpass": "securepass123"
  }

// 6. UPDATE USER (protected)
curl -X PUT http://localhost:3000/user/2 \
  -H "Content-Type: application/json" \
  -H "x-user-id: 1" \
  -d {
    "Username": "jane_smith"
  }

// 7. DELETE USER (protected)
curl -X DELETE http://localhost:3000/user/2 \
  -H "x-user-id: 1"

// 8. LOGOUT
curl -X POST http://localhost:3000/user/logout

// 9. GET ALL PRODUCTS (public)
curl -X GET http://localhost:3000/product/

// 10. GET PRODUCT BY ID (public)
curl -X GET http://localhost:3000/product/1

// 11. SEARCH PRODUCTS (public)
curl -X GET "http://localhost:3000/product/search/query?search=laptop"

// 12. CREATE PRODUCT (protected - with image)
curl -X POST http://localhost:3000/product/ \
  -H "x-user-id: 1" \
  -F "Product_Name=Laptop" \
  -F "Qty=10" \
  -F "Price=999.99" \
  -F "Discount=10" \
  -F "Category_ID=1" \
  -F "image=@/path/to/image.jpg"

// 13. UPDATE PRODUCT (protected)
curl -X PUT http://localhost:3000/product/1 \
  -H "Content-Type: application/json" \
  -H "x-user-id: 1" \
  -d {
    "Product_Name": "Gaming Laptop",
    "Price": 1299.99
  }

// 14. DELETE PRODUCT (protected)
curl -X DELETE http://localhost:3000/product/1 \
  -H "x-user-id: 1"

*/

module.exports = router;
