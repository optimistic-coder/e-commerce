const mongoose = require("mongoose");
const connectDB = () => {
  const uri =
    "MONGO_URI";

  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log("connected...");
    })
    .catch((er) => {
      console.log("Errr, ", er);
    });
};
module.exports = connectDB;
