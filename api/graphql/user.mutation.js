const createUser = (parent, { user }) => {
  return { ...user, id: 2 };
};

module.exports = { createUser };