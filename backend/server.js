const express = require("express");
const cors = require("cors");
const { typeDefs, resolvers } = require("./src/graphql");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
require("dotenv").config();
const db = require('./config/db_connection')
const { join } = require('path');

const {
  graphqlUploadExpress // A Koa implementation is also exported.
} = require('graphql-upload');
async function startServer() {
  const app = express();
  app.use(express.json());

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: false // we will enable it when we build the front side
  });
  app.use(graphqlUploadExpress());


  await apolloServer.start();
  app.use(express.static(join(__dirname, './uploads')),cors());
  app.use("/graphql",expressMiddleware(apolloServer));

  return app;
}


startServer().then((app) => {
  app.listen(process.env.PORT, () => {
     // perform a database connection when server starts
     db.connectToServer(function (err) {
       if (err) console.error(err);
     });
    console.log(`Server started on port ${process.env.PORT}` );
  });
});
