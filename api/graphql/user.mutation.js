const bcrypt = require("bcrypt");
const { AuthenticationError } = require("apollo-server");
const { validateUser, validateEmail } = require("./validators");
const User = require("../../db/models/user");
const { generateToken } = require("./utils");

const signUpUser = async (parent, { user }) => {
  // validate user input
  validateUser(user);
  // sign up the user
  const userPayload = { email: user.email };
  try {
    const found = await User.findOne({ email: user.email });
    if (found) {
      throw new Error("User already exist!");
    }
    user.password = await bcrypt.hash(user.password, 10);
    const newUser = await User(user).save();
    token = generateToken(
      userPayload,
      process.env.TOKEN_SECRET || "you are a 419"
    );
    return { token };
  } catch (error) {
    throw new Error(error.message);
  }
};

const loginUser = async (parent, { email, password }) => {
  validateEmail(email);
  try {
    const user = await User.findOne({ email });
    // throw error if user doesn't exist
    if (!user) {
      throw new Error("User does not exist! try to signup");
    }

    const match = await bcrypt.compare(password, user.password);
    // throw if the password is wrong
    if (!match) {
      throw new UserInputError("Email or password is wrong");
    }
    // add token to the user Object
    const token = await generateToken(
      { email: user.email },
      process.env.TOKEN_SECRET || "you are a 419"
    );
    return { token };
  } catch (error) {
    throw new AuthenticationError(error.message);
  }
};

const logoutUser = (parent, { email }) => {
  return { email, name: "" };
};

module.exports = { signUpUser, loginUser, logoutUser };
