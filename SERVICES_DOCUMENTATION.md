# Service Layer Architecture - Real World Implementation

This document outlines the new service layer architecture added to the POS Midterm project, following real-world software engineering best practices.

## Overview

The service layer separates business logic from HTTP request/response handling (controllers), making the code more maintainable, testable, and scalable.

## Folder Structure

```
services/
├── AuthService.js       # Authentication and user validation logic
├── UserService.js       # User CRUD operations
└── ProductService.js    # Product CRUD operations

middlewares/
├── authMiddleware.js    # Authentication middleware (NEW)
└── upload.js            # File upload middleware (existing)

controller/
├── UserController_refactored.js       # Refactored to use UserService
├── ProductController_refactored.js    # Refactored to use ProductService
├── UserController.js                  # Original (kept for reference)
└── ProductController.js               # Original (kept for reference)
```

## Service Files

### AuthService.js

Handles all authentication and password operations.

**Key Methods:**

- `hashPassword(password)` - Hash password using SHA-256
- `verifyPassword(plainPassword, hashedPassword)` - Verify password
- `authenticate(username, password)` - Authenticate user with credentials
- `registerUser(username, password)` - Register new user
- `validateUserExists(userId)` - Check if user exists

**Usage Example:**

```javascript
const AuthService = require("../services/AuthService");

// Authenticate user
const result = await AuthService.authenticate("john_doe", "password123");
if (result.success) {
  console.log("User authenticated:", result.data);
}

// Register new user
const registration = await AuthService.registerUser("jane_doe", "newpass123");
```

### UserService.js

Handles user-related operations.

**Key Methods:**

- `getAllUsers()` - Get all users
- `getUserById(id)` - Get user by ID with validation
- `createUser(userData)` - Create new user with duplicate check
- `updateUser(id, userData)` - Update user with password hashing
- `deleteUser(id)` - Delete user

**Features:**

- Automatic password hashing on create/update
- Input validation
- Duplicate username prevention
- Consistent response format

**Usage Example:**

```javascript
const UserService = require("../services/UserService");

// Get all users
const users = await UserService.getAllUsers();

// Create new user (password is automatically hashed)
const newUser = await UserService.createUser({
  Username: "john_doe",
  Userpass: "password123",
});
```

### ProductService.js

Handles product-related operations.

**Key Methods:**

- `getAllProducts()` - Get all products
- `getProductById(id)` - Get product by ID
- `createProduct(productData, imageFilename)` - Create product with image
- `updateProduct(id, productData, imageFilename)` - Update product
- `deleteProduct(id)` - Delete product
- `searchProducts(searchTerm)` - Search products by name

**Features:**

- Image filename handling
- Input validation
- Numeric field validation
- Search functionality

**Usage Example:**

```javascript
const ProductService = require("../services/ProductService");

// Get all products
const products = await ProductService.getAllProducts();

// Create product
const newProduct = await ProductService.createProduct(
  {
    Product_Name: "Laptop",
    Qty: 10,
    Price: 999.99,
    Discount: 10,
    Category_ID: 1,
  },
  "laptop_image.jpg",
);

// Search products
const results = await ProductService.searchProducts("laptop");
```

## Authentication Middleware

### authMiddleware.js

Provides authentication middleware for protecting routes.

**Middleware Functions:**

- `authMiddleware` - Requires authentication (401 if not authenticated)
- `optionalAuthMiddleware` - Optional authentication (doesn't block, but attaches user if available)

**Usage in Routes:**

```javascript
const express = require("express");
const router = express.Router();
const {
  authMiddleware,
  optionalAuthMiddleware,
} = require("../middlewares/authMiddleware");
const UserController = require("../controller/UserController_refactored");

// Protected routes - require authentication
router.get("/", authMiddleware, UserController.findAllUser_Rith);
router.get("/:id", authMiddleware, UserController.findUserById_Rith);

// Public routes
router.post("/register", UserController.register);
router.post("/login", UserController.login);
```

**Usage in Express App:**

```javascript
const app = express();
const { authMiddleware } = require("./middlewares/authMiddleware");

// Apply to all routes starting with /api (example)
app.use("/api", authMiddleware);

// Or apply globally
app.use(authMiddleware);
```

## Refactored Controllers

### UserController_refactored.js

Delegates business logic to UserService and AuthService.

**New Features:**

- `login` - User login endpoint
- `register` - User registration endpoint
- `logout` - User logout endpoint
- All existing CRUD operations now use UserService

**Response Format:**

```javascript
{
  status: 200,
  message: "Success",
  data: { /* user data or array */ }
}
```

### ProductController_refactored.js

Delegates business logic to ProductService.

**New Features:**

- `searchProducts` - Search products endpoint
- All CRUD operations now use ProductService

## Response Format

All services return a consistent response format:

```javascript
{
  status: 200,
  message: "Operation description",
  data: null // or data object/array
}
```

## Error Handling

Services throw errors with consistent format:

```javascript
throw {
  status: 500,
  message: "Error description",
};
```

Controllers catch and respond consistently:

```javascript
res.status(error.status || 500).json({
  status: error.status || 500,
  message: error.message,
  data: null,
});
```

## Migration Guide

### Step 1: Update package.json (if needed)

The project already has all necessary dependencies. For production authentication, consider adding:

```bash
npm install bcryptjs jsonwebtoken
```

### Step 2: Update Routes

Replace controller imports with refactored versions:

```javascript
// Before
const UserController = require("../controller/UserController");

// After
const UserController = require("../controller/UserController_refactored");
const { authMiddleware } = require("../middlewares/authMiddleware");
```

### Step 3: Add Authentication Routes

Update your routes file to include login/register:

```javascript
router.post("/login", UserController.login);
router.post("/register", UserController.register);
router.post("/logout", UserController.logout);
```

### Step 4: Protect Routes (Optional)

Add authentication middleware to protected routes:

```javascript
router.get("/", authMiddleware, UserController.findAllUser_Rith);
```

## Database Initialization

The existing migration file works with the service layer. No changes needed:

```bash
node migrate.js
```

## Testing Example

```javascript
// Test authentication
const result = await AuthService.authenticate("testuser", "password");
console.log(result);
// Output:
// {
//   success: true,
//   message: "Authentication successful",
//   data: { User_ID: 1, Username: "testuser" }
// }

// Test user creation
const newUser = await UserService.createUser({
  Username: "newuser",
  Userpass: "securepass123",
});
console.log(newUser);
// Output:
// {
//   status: 201,
//   message: "User created successfully",
//   data: { User_ID: 2, Username: "newuser" }
// }
```

## Best Practices Implemented

1. **Separation of Concerns** - Services handle logic, controllers handle HTTP
2. **Password Hashing** - Passwords are hashed before storage
3. **Input Validation** - All inputs are validated before processing
4. **Consistent Response Format** - All responses follow the same structure
5. **Error Handling** - Centralized error handling with appropriate HTTP status codes
6. **Reusability** - Services can be used by multiple controllers or external services
7. **Security** - Basic authentication middleware for route protection
8. **Documentation** - Clear JSDoc comments on all methods

## Production Recommendations

1. **Replace SHA-256 with bcrypt:**

   ```javascript
   const bcrypt = require("bcryptjs");
   const hashedPassword = await bcrypt.hash(password, 10);
   ```

2. **Implement JWT tokens instead of simple cookies**

3. **Add rate limiting for authentication endpoints**

4. **Use environment variables for sensitive data**

5. **Add comprehensive logging**

6. **Implement database transactions for complex operations**

7. **Add caching layer for frequently accessed data**

8. **Create unit tests for all services**

## Summary

The new service layer provides a professional, scalable foundation for the POS application with:

- Clean architecture following SOLID principles
- Proper separation of concerns
- Built-in authentication system
- Consistent error handling
- Professional middleware support
- Foundation for future enhancements

All original functionality is preserved while adding authentication capabilities and improved code organization.
