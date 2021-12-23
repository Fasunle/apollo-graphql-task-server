const taskQueries = require("./task.query");
const userQueries = require("./user.query");
const userMutations = require("./user.mutation");
const taskMutations = require("./task.mutation");
const { mutations } = require("./utils");

// resolver object with Query and Mutation fields
module.exports = {
  Query: {
    ...taskQueries,
    ...userQueries,
  },
  Mutation: {
    ...taskMutations,
    ...userMutations,
    ...mutations,
  },
};
