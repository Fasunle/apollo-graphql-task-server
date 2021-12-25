const { skip } = require("graphql-resolvers");

/**
 *
 * @param {*} parent
 * @param {*} _ params
 * @param {*} param2
 * throw error if the user is not logged in
 */
exports.isAuthenticated = (parent, _, { email }) => {
  if (!email) {
    throw new Error("Access denied! Please login to continue");
  }
  //not a function
  skip;
};
