const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Order = sequelize.define(
  "order_Rith",
  {
    Order_Rith_ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Orderdate_Rith: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    OrderNo_Rith: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    UserID_Rith: {
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
