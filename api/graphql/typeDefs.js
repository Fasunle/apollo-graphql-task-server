const { gql } = require("apollo-server");

module.exports = gql`
  type Query {
    getTask(taskId: String!): TaskType
    getTasks: [TaskType!]
  }
  type Mutation {
    signUpUser(user: UserInputType!): UserType!
    createTask(task: TaskInputType!): TaskType!
    loginUser(email: String!): UserType!
    logoutUser(email: String!): UserType!
  }

  type TaskType {
    title: String!
    description: String!
    id: ID!
  }

  type UserType {
    name: String!
    tasks: [String!]
    email: String!
    id: ID!
  }

  input UserInputType {
    name: String!
    password: String!
    email: String!
  }
  input TaskInputType {
    title: String!
    description: String!
  }
`;
