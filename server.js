const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
require("dotenv").config();
//
const { MONGODB_URI, SERVER_PORT } = require("./utils/variables");
const resolvers = require("./api/graphql");
const typeDefs = require("./api/graphql/typeDefs");

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
