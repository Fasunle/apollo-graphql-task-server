const { verify } = require("jsonwebtoken");

/**
 *
 * @param {*} req
 * verify that user is logged in
 */
exports.verifyUser = (req) => {
  try {
    req.email = null;
    const secret = process.env.TOKEN_SECRET || "you are a 419";
    // token passed in the header.authorization
    const authHeader = req.headers?.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      const tokenPayload = verify(token, secret);
      req.email = tokenPayload.email;
    }
  } catch (error) {
    console.log(error);
  }
};
