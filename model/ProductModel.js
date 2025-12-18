const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Product = sequelize.define(
  "product_Rith",
  {
    Product_ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Product_Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Discount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Category_ID: {
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
