const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("Registration", "admin", "Naveen@123", {
  host: "localhost",
  dialect: "mysql",
  logging: console.log, // Enable Sequelize logging
});

async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.sync(); // Sync the models with the database
    console.log("Models synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

connectToDatabase(); // Call the async function to establish the connection

module.exports = sequelize;
