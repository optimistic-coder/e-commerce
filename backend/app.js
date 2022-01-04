const express = require("express");
const cookieParser = require("cookie-parser")
const connectDB = require("./config/database");
const ProductRoute = require("./routes/ProductRoute");
const UserRoute = require("./routes/UserRoute")
const errMiddleware = require("./middleware/error")
const cors = require('cors')
const OrderRoute = require("./routes/OrderRoute")

const app = express();
app.use(cors())
app.use(express.json());
app.use(errMiddleware)
app.use(cookieParser())

//connectDB
connectDB();

const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");


app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);

module.exports = app;
