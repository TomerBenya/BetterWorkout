const express = require("express"),
  router = express.Router(),
  mongoose = require("mongoose"),
  Template = mongoose.model("Template"),
  ExerciseTemplate = mongoose.model("ExerciseTemplate"),
  Workout = mongoose.model("Workout"),
  Exercise = mongoose.model("Exercise"),
  Set = mongoose.model("Set");

const ObjectId = mongoose.Types.ObjectId;

const isAuthenticated = (req, res, next) => {
  if (!req.user) {
    res.redirect("/");
    console.log("redirecting");
  } else {
    next();
  }
};
router.use(isAuthenticated);

router.get("/history", async (req, res) => {
  console.log("View Logged Workouts");
  const workouts = await Workout.find({ user: req.user._id })
    .sort({ completedAt: -1 })
    .exec();
  res.render("workout-history.hbs", { workouts });
});
router.get("/select", (req, res) => {
  console.log("select workout");
  Template.find({ user: req.user._id }, (err, templates) => {
    res.render("workout-select.hbs", { templates });
  });
});

router.get("/:templateId", async (req, res) => {
  const { templateId } = req.params;
  console.log("start workout");

  if (!ObjectId.isValid(templateId)) return res.status(400).end();

  const template = (
    await Template.findOne({
      user: req.user._id,
      _id: templateId,
    }).exec()
  ).toObject();

  const last = await Workout.findOne({
    user: req.user._id,
    template: templateId,
  })
    .sort({ completedAt: -1 })
    .exec();

  template.exerciseTemplates.forEach((exerciseTemplate, index) => {
    exerciseTemplate.weight = last
      ? last.exercises[index].sets[0].weight + exerciseTemplate.increment
      : 0;
  });

  console.log(template);
  res.render("workout.hbs", template);
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
