const getTask = async (parent, { taskId }) => {
  console.log({ taskId });
  return {
    id: 1,
    title: "Task 1",
    description: "Go to market",
  };
};
const getTasks = async () => {
  return [
    {
      id: 1,
      name: "Task 1",
      description: "Go to market",
    },
    {
      id: 2,
      name: "Task 1",
      description: "Go to market",
    },
    {
      id: 3,
      name: "Task 1",
      description: "Go to market",
    },
    {
      id: 4,
      name: "Task 1",
      description: "Go to market",
    },
  ];
};

module.exports = { getTask, getTasks };
