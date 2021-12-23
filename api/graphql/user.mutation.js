const signUpUser = (parent, { user }) => {
  return { ...user, id: 2 };
};

module.exports = { signUpUser };
