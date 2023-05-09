const express = require("express");
const cors = require("cors");
const { typeDefs, resolvers } = require("./src/graphql");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
require("dotenv").config();
const db = require('./config/db_connection')

async function startServer() {
  const app = express();
  const schema = {typeDefs,resolvers}

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ request, reply }) => ({
      request,
      reply,
    }),
  });

  await apolloServer.start();
  app.use(express.json(), cors());
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
