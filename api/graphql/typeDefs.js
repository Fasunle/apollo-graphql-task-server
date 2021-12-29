const { gql } = require("apollo-server");

module.exports = gql`
  type Query {
    getTask(taskId: String!): TaskType
    getTasks: [TaskType!]
  }
  type Mutation {
    createTask(task: TaskInputType!): TaskType!
    deleteTask(id: String!): String
    loginUser(email: String!, password: String!): TokenType
    #nullable because if the user exist, we return null
    signUpUser(user: UserInputType!): TokenType
    #nullable because if the user could not be created, we return null
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
    token: String!
    id: ID!
  }

  type TokenType {
    token: String!
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
