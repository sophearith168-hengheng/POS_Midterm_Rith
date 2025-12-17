const sequelize = require("./config/db");
const category = require("./model/CategoryModel");
const product = require("./model/ProductModel");
const user = require("./model/UserModel");
const order = require("./model/OrderModel");
const orderDetail = require("./model/OrderDetail");

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    await sequelize.sync({ alter: true });

    console.log("Migration completed successfully.");

    process.exit();
  } catch (error) {
    console.error("Migration Failed:", error);
    process.exit(1);
  }
})();
