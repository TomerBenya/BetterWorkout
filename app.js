require("./db");
const passport = require("passport");
const express = require("express");
const path = require("path");
const hbs = require("hbs");
require("./auth");
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");
const workoutRouter = require("./routes/workout");
const templateRouter = require("./routes/template");

const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));

Object.entries(require("./util/helpers")).forEach(([name, fn]) =>
  hbs.registerHelper(name, fn)
);
app.set("view engine", "hbs");

// enable sessions
const session = require("express-session");
const sessionOptions = {
  secret: "secret cookie thang (store this elsewhere!)",
  resave: true,
  saveUninitialized: true,
};
app.use(session(sessionOptions));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// passport setup
app.use(passport.initialize());
app.use(passport.session());

// make user data available to all templates
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

app.use("/", indexRouter);
app.use("/template", templateRouter);
app.use("/workout", workoutRouter);
app.listen(8080);
module.exports = app;
