const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const calendarRoutes = require("./routes/calendar");
const authRoutes = require("./routes/auth");
//I removed link from my mongodb collection, you can enter your own in the ./URI.js file.
const { MONGODB_URI } = require("./URI");



const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, POST, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/", calendarRoutes);
app.use("/auth", authRoutes);

app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    message: error.message
  });
});

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    app.listen(8080);
  })
  .catch(err => {
    console.log(err);
  });
