const app = require("./app");
const dotenv = require("dotenv");

//config
dotenv.config({ path: "./config/config.env" });


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
