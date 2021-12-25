const { combineResolvers } = require("graphql-resolvers");
const Task = require("../../db/models/task");
const User = require("../../db/models/user");
const { isAuthenticated } = require("../../middleware");

const createTask = combineResolvers(
  isAuthenticated,
  async (parent, { task }, { email }) => {
    const user = await User.findOne({ email });
    const newTask = await Task({ ...task, id: user.id });
    await newTask.save();
    return newTask;
  }
);

module.exports = { createTask };
