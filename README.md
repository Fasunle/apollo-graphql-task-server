# Apollo GraphQL Server {header}

## Folder Structure {structure}

* api
  - task.mutation.js
  - task.query.js
  - user.mutation.js
  - user.query.js
  - utils.js
  - validators.js
  - typeDefs.js
  - index.js
* db
  - models
    - user.js
    - task.js
* middleware
* utils/variables.js

## Description {description}

Apollo-graphql-task-server is a simple server that helps to create and manage tasks. Each tack therefore has a user and the user can perform CRUD operation on the server.

A user is provided an authentication token which will expire in 24 hours. The Users task is persisted and uses NoSQL database(mongo)

## Decision {decision}

`api/graphql`

This folder containts all graphql related tasks like user and task mutations as well as queries, with `typeDefs`

This is done so as to have modularity which support extension. If `REST` api needs to be used with the graphql api, there will be no complexity in managing the two different protocols.

`file naming convention`

'object.query' or 'object.mutation' is used to have a very easy to reason about file structure.

`db`

The database used here is a NoSQL database (mongo). It does not require the use of schema in managing its collections unlike in SQL based RDBMS like PostgreSQL. But, `mongoose package` allows us to create a schema which enforce the structure of data in a collection. This prevent commiting unintended data to database.

`middleware`

This include `isAuthenticated middleware` which enables only authenticated and authorized users to perform certain operations such as create, read, update and delete (CRUD!).

`utils`

An application level utility folder.

## How to use this app {how to}

You can use this server by firstly cloning this repository.

- create a folder where you would clone this repo into
- cd into the folder. For example, `cd server`
- execute `git clone 'https://github.com/Fasunle/apollo-graphql-server.git' .`
- once completed, execute `yarn` or `npm i`
- update the .env file with the .env.example file.
- start your development server by executing `yarn dev` or production server by `yarn start`
