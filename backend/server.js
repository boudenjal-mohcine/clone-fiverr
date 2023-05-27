const express = require("express");
const cors = require("cors");
const { typeDefs, resolvers } = require("./src/graphql");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
require("dotenv").config();
const db = require('./config/db_connection');
const { join } = require('path');
const userRoutes = require('./routes/user');
const auth = require('./src/middleware/auth');
const categoryRoutes = require('./routes/category')
const gigRoutes = require('./routes/gig')

const {
  graphqlUploadExpress 
} = require('graphql-upload');
const path = require("path");


async function startServer() {
  const app = express();
  
  app.use(express.json(),cors());
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: false // we will enable it when we build the front side
  });

  app.use('/banners', express.static(__dirname + '/src/uploads/banners'));
  app.use('/profiles', express.static(__dirname + '/src/uploads/profiles'));

  await apolloServer.start();
  app.use('/static', express.static(__dirname + '/public'));
  app.use(graphqlUploadExpress());
  app.use("/graphql",expressMiddleware(apolloServer));
  app.use("/api/auth", userRoutes);
  app.use("/api/category", categoryRoutes);
  app.use("/api/gig", gigRoutes);

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
