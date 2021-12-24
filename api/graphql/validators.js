const { UserInputError } = require("apollo-server");

const validateEmail = (email) => {
  const regEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const error = {};
  if (!email) {
    error.message = "User email must be specified";
    throw new UserInputError("User email must be specified", {
      errors: {
        message: "User email must be given",
      },
    });
  }

  if (!email.match(regEx)) {
    error.message = "Email format is not supported";
    throw new UserInputError("email format is required", {
      error: { message: "Email format is not supported" },
    });
  }
  error.valid = Object.keys(error).length < 1;
  return error;
};

const validateUser = (user) => {
  const error = {};
  if (user.name === "" || user.name === null) {
    error.message = "User name must be specified";
    throw new UserInputError("User name must be specified", {
      errors: {
        message: "User name must be given",
      },
    });
  }

  return validateEmail(user.email);
};

module.exports = {
  validateUser,
  validateEmail,
};
