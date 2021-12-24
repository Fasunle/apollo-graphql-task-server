const bcrypt = require("bcrypt");
const { validateUser, validateEmail } = require("./validators");
const User = require("../../db/models/user");

const signUpUser = async (parent, { user }) => {
  // validate user input
  const { valid } = validateUser(user);
  // sign up the user
  try {
    const found = await User.findOne({ email: user.email });
    if (found) {
      throw new Error("User already exist!");
    }
    user.password = await bcrypt.hash(user.password, 10);
    const newUser = await User(user).save();
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
      // const newUser = { ...user, token: "" };
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        throw new UserInputError("Email or password is wrong");
      }
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
