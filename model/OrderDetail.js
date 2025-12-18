const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const OrderDetail = sequelize.define(
  "order_detail_Rith",
  {
    Odid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Proid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Orid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Discount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: 0.0,
    },
  },
  {
    tableName: "order_detail_Rith",
    timestamps: false,
  }
);

module.exports = OrderDetail;
