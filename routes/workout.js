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

router.get("/history", (req, res) => {
  console.log("View Logged Workouts");
  Workout.find({ user: req.user._id }, (err, workouts) => {
    res.render("workout-history.hbs", { workouts });
  });
});
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
  /** @type {{sets: number, reps: number}[][]} */
  const exercises = req.body;
  console.log(exercises);
  console.log(templateId);

  const template = await Template.findOne({ _id: templateId }).exec();

  const exerciseNames = template.exerciseTemplates.map((tmpl) => tmpl.name);

  const workout = new Workout({
    name: template.name,
    user: req.user,
    completedAt: Date.now(),
    template: templateId,
    exercises: exercises.map(
      (sets, index) =>
        new Exercise({
          name: exerciseNames[index],
          sets: sets.map((set) => new Set(set)),
        })
    ),
  });

  await workout.save();
  return res.status(200).end();
});

module.exports = router;
