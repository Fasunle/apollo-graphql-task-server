const { skip } = require("graphql-resolvers");
const { verify } = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server");

/**
 *
 * @param {*} parent
 * @param {*} _ params
 * @param {*} param2
 * throw error if the user is not logged in
 */
exports.isAuthenticated = (parent, _, { req }) => {
  const secret = process.env.TOKEN_SECRET || "you are a 419";

  // token passed in the header.authorization
  const authHeader = req.headers;

  if (!authHeader.authorization) {
    throw new Error("Authorization header must be provided!");
  }

  const token = authHeader.authorization.split(" ")[1];

  try {
    // throw automatically if invalid token
    const user = verify(token, secret);
    if (user) {
      req.email = user.email;
    }
  } catch (error) {
    throw new AuthenticationError(
      error.message + " please login with a valid token"
    );
  }

  if (!req.email) {
    throw new Error("Access denied! Please login to continue");
  }
  //not a function
  skip;
};
