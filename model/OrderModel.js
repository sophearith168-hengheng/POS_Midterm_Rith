const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Order = sequelize.define(
  "order_Rith",
  {
    Order_ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Orderdate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    OrderNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "order_Rith",
    timestamps: false,
  }
);

module.exports = Order;
