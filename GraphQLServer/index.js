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

    type Mutation {
      addRegistartionDetails(
        id: Int
        username: String
        password: String
        email: String
        phoneNumber: String
        address: String
        pincode: String
        nationality: String
      ): AddData

      deleteRegistrationDetails(id: Int): DeleteData

      updateRegistrationDetails(
        id: Int
        username: String
        password: String
        email: String
        phoneNumber: String
        address: String
        pincode: String
        nationality: String
      ): UpdateData
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

    type AddData {
      message: String
    }

    type DeleteData {
      message: String
    }

    type UpdateData {
      message: String
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

    Mutation: {
      async addRegistartionDetails(root, args, context) {
        let Response = {};
        const Details = await Registration.create({
          username: args.username,
          password: args.password,
          email: args.email,
          phoneNumber: args.phoneNumber,
          address: args.address,
          pincode: args.pincode,
          nationality: args.nationality,
        });
        if (Details) {
          Response.message = "Succefully added";
        } else {
          Response.message = "failed to added";
        }
        return Response;
      },

      async deleteRegistrationDetails(root, args, context) {
        try {
          const { id } = args;
          const deletedCount = await Registration.destroy({
            where: { id: id },
          });

          if (deletedCount > 0) {
            return { message: "Successfully deleted" };
          } else {
            return { message: "Failed to delete" };
          }
        } catch (error) {
          throw new Error("Failed to delete detail", error);
        }
      },

      async updateRegistrationDetails(root, args, context) {
        try {
          let Details = await Registration.update(
            {
              username: args.username,
              password: args.password,
              email: args.email,
              phoneNumber: args.phoneNumber,
              address: args.address,
              pincode: args.pincode,
              nationality: args.nationality,
            },
            {
              where: {
                id: args.id,
              },
            }
          );

          let response = {
            message: null,
          };

          if (Details) {
            response.message = "Successfully updated";
          } else {
            response.message = "Failed to update";
          }

          return response;
        } catch (error) {
          throw new Error("Failed to update user");
        }
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
