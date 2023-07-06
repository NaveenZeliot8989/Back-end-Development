const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");

async function startServer() {
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
      hello: () => "Hello, GraphQL!",
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
