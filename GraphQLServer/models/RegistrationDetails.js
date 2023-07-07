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
    validate: {
      isEmail: true,
    },
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      is: /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, // Phone number format validation (e.g., +1234567890)
    },
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isEmail: true,
    },
  },
  pincode: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isEmail: true,
    },
  },
  nationality: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isEmail: true,
    },
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
