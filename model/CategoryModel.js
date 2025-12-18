const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Category = sequelize.define(
  "category_Rith",
  {
    Category_ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Category_Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "category_Rith",
    timestamps: false,
  }
);

module.exports = Category;
