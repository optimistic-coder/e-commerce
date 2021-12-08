const express = require("express");
const cookieParser = require("cookie-parser")
const connectDB = require("./config/database");
const ProductRoute = require("./routes/ProductRoute");
const UserRoute = require("./routes/UserRoute")
const errMiddleware = require("./middleware/error")
const OrderRoute = require("./routes/OrderRoutes")

const app = express();
app.use(express.json());
app.use(errMiddleware)
app.use(cookieParser())

//connectDB
connectDB();

app.get("/", (req, res) => {
  res.send("Hello");
});
app.use("/user",UserRoute)
app.use("/products", ProductRoute);
app.use("/orders",OrderRoute)

module.exports = app;
