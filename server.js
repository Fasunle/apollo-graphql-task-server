"use strict";

const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
require("dotenv").config();
//
const { MONGODB_URI, SERVER_PORT } = require("./utils/variables");
const resolvers = require("./api/graphql");
const typeDefs = require("./api/graphql/typeDefs");

// Apolloserver with dummy typeDefs and resolvers
const server = new ApolloServer({ typeDefs, resolvers });

const dbConnect = async () => {
  try {
    const connected = await mongoose.connect(MONGODB_URI);
    if (connected) {
      const { url } = await server.listen(SERVER_PORT);
      console.log(`Database connected successfully ✈`);
      console.log(`🚀 Server started on ${url}`);
    } else {
      console.log(`Database connection failed`);

      server.stop();
    }
    !connected && console.log("Unable to connect to the database ");
  } catch (error) {
    console.log(error);
    mongoose.disconnect();
  }
};

dbConnect();
