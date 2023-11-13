const express = require("express");
require("dotenv").config();
const app = express();
app.use(express.json());
const port = process.env.PORT || 4000;
const bookingRouter = require("./router/booking")

app.get("/", (req, res) => {
  res.status(200).send({ msg: "Welcome to Hall Booking App" });
});

app.use("/booking", bookingRouter);

app.listen(port);