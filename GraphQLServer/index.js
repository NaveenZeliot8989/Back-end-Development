const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const sequelize = require("./config/database");
const Registration = require("./models/RegistrationDetails");

async function startServer() {
  await sequelize.sync(); // Sync the models with the database

  const app = express();

  // GraphQL schema
  const typeDefs = gql`
    type Query {
      getRegistrationDetails(id: Int): [Details]
    }

    type Details {
      id: Int
      username: String
      password: String
      email: String
      phoneNumber: String
      address: String
      pincode: String
      nationality: String
    }
  `;

  // GraphQL resolvers
  const resolvers = {
    Query: {
      async getRegistrationDetails(root, args, context) {
        let Response = {};
        const Details = await Registration.findAll({
          where: { id: args.id },
        });

        console.log("Detsils ---->", Details[0].dataValues.id);
        let result = []; // Declare and initialize the result array
        if (Details && Details.length > 0) {
          Response.id = Details[0].dataValues.id;
          Response.username = Details[0].dataValues.username;
          Response.password = Details[0].dataValues.password;
          Response.email = Details[0].dataValues.email;
          Response.phoneNumber = Details[0].dataValues.phoneNumber;
          Response.address = Details[0].dataValues.address;
          Response.pincode = Details[0].dataValues.pincode;
          Response.nationality = Details[0].dataValues.nationality;
          console.log("Response-->", Response);
          result.push(Response);
          console.log("result-->", result);
        }
        return result;
      },
    },
  };

  // Apollo Server
  const server = new ApolloServer({ typeDefs, resolvers });

  // Wait for the server to start
  await server.start();

  // Apply middleware
  server.applyMiddleware({ app });

  // Start the server
  const port = 4000;
  app.listen(port, () => {
    console.log(
      `Server running at http://localhost:${port}${server.graphqlPath}`
    );
  });
}

startServer().catch((err) => {
  console.error("Error starting server:", err);
});
