const express = require("express"),
  router = express.Router(),
  mongoose = require("mongoose"),
  Template = mongoose.model("Template"),
  ExerciseTemplate = mongoose.model("ExerciseTemplate"),
  Workout = mongoose.model("Workout"),
  Exercise = mongoose.model("Exercise"),
  Set = mongoose.model("Set");

const isAuthenticated = (req, res, next) => {
  if (!req.user) {
    res.redirect("/");
    console.log("redirecting");
  } else {
    next();
  }
};
router.use(isAuthenticated);

router.get("/select", (req, res) => {
  console.log("select workout");
  Template.find({ user: req.user._id }, (err, templates) => {
    // console.log(templates);
    res.render("workout-select.hbs", { templates });
  });
});

router.get("/:templateId", (req, res) => {
  const { templateId } = req.params;

  console.log("start workout");
  Template.find({ user: req.user._id, _id: templateId }, (err, template) => {
    // console.log(templates);
    res.render("workout.hbs", { template });
  });
});

router.post("/:templateId", async (req, res) => {
  const { templateId } = req.params;

  console.log(templateId);

  const template = await Template.findOne({ _id: templateId }).exec();
  const workout = new Workout({
    template: template.name,
    user: req.user,
    createdAt: Date.now(),
  });

  await workout.save();
  return res.status(200).end();
});

module.exports = router;
