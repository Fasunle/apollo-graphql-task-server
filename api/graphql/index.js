const taskQueries = require("./task.query");
const userQueries = require("./user.query");
const userMutations = require("./user.mutation");
const taskMutations = require("./task.mutation");

module.exports = {
  Query: {
    ...taskQueries,
    ...userQueries,
  },
  Mutation: {
    ...taskMutations,
    ...userMutations,
  },
};
