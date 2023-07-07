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
      hello: String
    }
  `;

  // GraphQL resolvers
  const resolvers = {
    Query: {
      async getRegistrationDetails(root, args, context) {},
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
