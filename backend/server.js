const app = require("./app");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
//config
dotenv.config({ path: "./config/config.env" });

cloudinary.config({
  cloud_name: "dalzezmer",
  api_key: "515928225831865",
  api_secret: "O5cZLt9MiBbnfIckb8mDDuqlp5I",
});
const server = app.listen(4000, () => {
  console.log("server is running...", process.env.PORT);
});

process.on("unhandleRejection", (err) => {
  console.log("Err ", err.message)
  console.log("Shutting down server beacase erros")
  server.close(() => {
    process.exit(1)
  })
})
