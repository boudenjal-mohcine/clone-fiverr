const mongoose = require("mongoose");


module.exports = {
  connectToServer: function (callback) {
    //connect to mongodb
    mongoose
      .connect(
        `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER_NAME}/fiverr_dbs?retryWrites=true&w=majority`
      )
      .then(() => {
        console.log("Successfully connected to MongoDB Atlas!");
      })
      .catch((error) => {
        console.log("Unable to connect to MongoDB Atlas!");
        console.error(error);
      });
  },
};
