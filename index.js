const { ApolloServer } = require('apollo-server-micro')


const typeDefs = require("./schema");
const resolvers = require("./resolvers");


const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true
})

module.exports = server.createHandler();
