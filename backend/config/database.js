const mongoose = require("mongoose");
const connectDB = () => {
  const uri =
    "mongodb+srv://akash:123@cluster0.1ogoj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

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
