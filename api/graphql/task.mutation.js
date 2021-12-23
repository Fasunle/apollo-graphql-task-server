const createTask = (parent, { task }) => {
  console.log({ task });
  return { ...task, id: "2" };
};

module.exports = { createTask };
