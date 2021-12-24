const { gql } = require("apollo-server");

module.exports = gql`
  type Query {
    getTask(taskId: String!): TaskType
    getTasks: [TaskType!]
  }
  type Mutation {
    signUpUser(user: UserInputType!): UserType #nullable because if the user could not be created, we return null
    createTask(task: TaskInputType!): TaskType!
    loginUser(email: String!, password: String!): UserType #nullable because if the user exist, we return null
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
