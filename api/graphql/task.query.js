const Task = require("../../db/models/task");

const { combineResolvers } = require("graphql-resolvers");
const { isAuthenticated } = require("../../middleware");
const User = require("../../db/models/user");

const getTask = combineResolvers(
  isAuthenticated,
  async (parent, _, { req }) => {
    const email = req.email;
    try {
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error("user does not exist!");
      }
      const task = await Task.findOne({ createdBy: user.id });
      return task;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

const getTasks = combineResolvers(
  isAuthenticated,
  async (parent, _, { req }) => {
    const email = req.email;
    try {
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error("user does not exist!");
      }
      const task = await Task.find({ createdBy: user.id });
      return task;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

module.exports = { getTask, getTasks };
