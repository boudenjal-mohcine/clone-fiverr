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
const {
  graphqlUploadExpress 
} = require('graphql-upload');


async function startServer() {
  const app = express();
  
  app.use(express.json(),cors());
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: false // we will enable it when we build the front side
  });


  await apolloServer.start();
  app.use(express.static(join(__dirname, './uploads')));
  app.use("/graphql",expressMiddleware(apolloServer));
  app.use("/api/auth", userRoutes);
  app.use("/api/category", categoryRoutes);
  app.use(graphqlUploadExpress());

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
