const mongoose = require("mongoose");

module.exports = {
  connectToServer: function () {
    //connect to mongodb
    mongoose.connect(
        'mongodb+srv://mohcineboudenjal:X62DCaulVwh9RtSK@cluster0.spbrwpo.mongodb.net/'                                                               
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
