const { ApolloServer, gql } = require("apollo-server");
const mongoose = require("mongoose");
require("dotenv").config();
const { MONGODB_URI, SERVER_PORT } = require("./utils/variables");

const typeDefs = gql`
  type Query {
    greetings: String
  }
`;
const resolvers = {};

// Apolloserver with dummy typeDefs and resolvers
const server = new ApolloServer({ typeDefs, resolvers });

//  create connection to the database and if error occurs, it disconnects
mongoose.connect(
  MONGODB_URI,
  { useNewUserParser: true, useTopology: true },
  async () => {
    console.log(`Database connected successfully ✈`);
    try {
      const { url } = await server.listen(SERVER_PORT);
      return console.log(`🚀 Server running on ${url}`);
    } catch (error) {
      console.log(error);
      mongoose.disconnect();
    }
  }
);
