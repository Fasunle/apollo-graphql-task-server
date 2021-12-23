const loginUser = (parent, { email }) => {
  return { email, name: "" };
};

const logoutUser = (parent, { email }) => {
  return { email, name: "" };
};

module.exports = {
  mutations: { loginUser, logoutUser },
};
