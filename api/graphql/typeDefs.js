const { gql } = require("apollo-server");

module.exports = gql`
  type Query {
    greetings: String
  }
  type Mutation {
    me: String
  }
`;
