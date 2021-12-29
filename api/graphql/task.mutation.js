const { AuthenticationError } = require("apollo-server");
const { combineResolvers } = require("graphql-resolvers");
const Task = require("../../db/models/task");
const User = require("../../db/models/user");
const { isAuthenticated } = require("../../middleware");

const createTask = combineResolvers(
  isAuthenticated,
  async (parent, { task }, context) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("Please signup and come back to create tasks");
      }
      const newTask = await Task({ ...task, createdBy: user.id });
      await newTask.save();
      return newTask;
    } catch (error) {
      throw new AuthenticationError(error.message);
    }
  }
);

const deleteTask = (id) => {
  return id;
};

module.exports = { createTask };
