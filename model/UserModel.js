const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define(
  "User_Rith",
  {
    User_ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    Userpass: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "user_Rith",
    timestamps: false,
  }
);

module.exports = User;
