const bcrypt = require("bcrypt");
const { validateUser, validateEmail } = require("./validators");
const User = require("../../db/models/user");
const { generateToken } = require("./utils");

const signUpUser = async (parent, { user }) => {
  // validate user input
  const { valid } = validateUser(user);
  // sign up the user
  const userPayload = { email: user.email, name: user.name };
  try {
    const found = await User.findOne({ email: user.email });
    if (found) {
      throw new Error("User already exist!");
    }
    user.password = await bcrypt.hash(user.password, 10);
    const newUser = await User(user).save();
    // add token to the newUser Object
    newUser.token = generateToken(userPayload, user.password);
    return newUser;
  } catch (error) {
    console.error("Error occured ", error);
  }
};

const loginUser = async (parent, { email, password }) => {
  validateEmail(email);
  try {
    const user = await User.findOne({ email });
    if (user) {
      const userData = {
        name: user.name,
        email: user.email,
      };
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        throw new UserInputError("Email or password is wrong");
      }
      // add token to the user Object
      user.token = generateToken(userData, password);
      return user;
    }
    throw new UserInputError("User does not exist! try to signup");
  } catch (error) {
    console.log("User does not exist!", error);
  }
};

const logoutUser = (parent, { email }) => {
  return { email, name: "" };
};

module.exports = { signUpUser, loginUser, logoutUser };
