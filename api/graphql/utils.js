const jsonwebtoken = require("jsonwebtoken");

exports.generateToken = async (payload, secret) => {
  const token = await jsonwebtoken.sign(payload, secret);
  return token;
};
