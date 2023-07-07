const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");

const Registration = sequelize.define("registration", {
  username: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  pincode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  nationality: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

// Registration.sync({ force: true });

sequelize
  .sync()
  .then(() => {
    console.log("Table created successfully.");
  })
  .catch((error) => {
    console.error("Unable to create table:", error);
  });

module.exports = Registration;
