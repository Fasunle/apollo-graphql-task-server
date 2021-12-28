const jsonwebtoken = require("jsonwebtoken");

exports.generateToken = async (payload, secret) => {
  try {
    const token = await jsonwebtoken.sign(payload, secret, {
      expiresIn: "1d", // this allows the token to expire and request the user to login again
    });
    return token;
  } catch (error) {
    console.log(error);
  }
};
