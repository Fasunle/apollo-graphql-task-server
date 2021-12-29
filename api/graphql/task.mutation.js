const { AuthenticationError } = require("apollo-server");
const { combineResolvers } = require("graphql-resolvers");
const Task = require("../../db/models/task");
const User = require("../../db/models/user");
const { isAuthenticated } = require("../../middleware");

const createTask = combineResolvers(
  isAuthenticated,
  async (parent, { task }, { req }) => {
    const email = req.email;
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

const deleteTask = combineResolvers(
  isAuthenticated,
  async (_, { id }, { req }) => {
    const email = req.email;
    try {
      // get user id
      const user = await User.findOne({ email });

      // check if user exist
      if (!user) {
        throw new Error("user does not exist!");
      }

      // delete task with id specified
      const { deletedCount } = await Task.deleteOne({ id, createdBy: user.id });

      // return id if deletion was successful
      if (deletedCount > 0) {
        return id;
      } else {
        return null;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

const updateTask = combineResolvers(
  isAuthenticated,
  async (_, { task_update }, { req }) => {
    const email = req.email;
    // desctructure task_update
    const { id, title, description } = task_update;
    try {
      // update task with id specified
      await Task.updateMany({ _id: id }, { description, title });
      return id;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

module.exports = { createTask, deleteTask, updateTask };
