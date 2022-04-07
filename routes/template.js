const express = require("express"),
  router = express.Router(),
  mongoose = require("mongoose"),
  Template = mongoose.model("Template"),
  ExerciseTemplate = mongoose.model("ExerciseTemplate");

const isAuthenticated = (req, res, next) => {
  if (!req.user) {
    res.redirect("/");
    console.log("redirecting");
  } else {
    next();
  }
};

router.use(isAuthenticated);

router.get("/", (req, res) => {
  // console.log(req.user);
  Template.find({ user: req.user._id }, (err, templates) => {
    // console.log(templates);
    res.render("templates.hbs", { templates });
  });
});

router.get("/create", (req, res) => {
  res.render("template-create.hbs");
});

router.post("/create", (req, res) => {
  const { templateName, exercises } = req.body;
  console.log(req.body);

  new Template({
    user: req.user,
    name: templateName,
    createdAt: Date.now(),
    exerciseTemplates: exercises.map((data) => new ExerciseTemplate(data)),
  }).save((err, list, count) => {
    res.status(200).end();
  });
});

router.get("/:slug", (req, res) => {});

module.exports = router;
