const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");
const cors = require("cors");
//const expressLayouts = require("express-ejs-layouts");
require("dotenv").config();

const URI = process.env.MONGOOSE_URI;

mongoose.connect(URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Database is connected");
});

mongoose.Promise = global.Promise;

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "4096mb" }));
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// EJS
//app.use(expressLayouts);
app.set("view engine", "ejs");
app.use("/static", express.static("./static/"));

// Express session
app.use(
  session({
    secret: "aldiSurfSchoolPendorcho",
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
require("./api/config/passport")(passport);
// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});
const indexRoutes = require("./api/routes/index");
const usersRoutes = require("./api/routes/users");
const recordRoutes = require("./api/routes/records");
const raspiRoutes = require("./api/routes/raspis");
const suscriptionsRoutes = require("./api/routes/suscriptions");

// Routes which should handle requests
app.use("/", indexRoutes);
app.use("/users", usersRoutes);
app.use("/records", recordRoutes);
app.use("/raspis", raspiRoutes);
app.use("/suscriptions", suscriptionsRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
