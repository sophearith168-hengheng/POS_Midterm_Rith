const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Product = sequelize.define(
  "product_Rith",
  {
    Product_Rith_ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Product_Rith_Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Qty_Rith: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Price_Rith: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Discount_Rith: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Category_Rith_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "product_Rith",
    timestamps: false,
  }
);

module.exports = Product;
