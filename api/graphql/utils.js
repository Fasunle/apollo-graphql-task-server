const jsonwebtoken = require("jsonwebtoken");

exports.generateToken = async (payload, secret) => {
  return await jsonwebtoken.sign(payload, secret);
};
