const mongoose = require("mongoose"),
  URLSlugs = require("mongoose-url-slugs"),
  passportLocalMongoose = require("passport-local-mongoose");
require("dotenv").config();

console.log(process.env.DB_CONN);
const ExerciseTemplate = new mongoose.Schema(
  {
    name: { type: String, required: true },
    sets: { type: Number, min: 1, required: true },
    reps: { type: Number, min: 1, required: true },
    increment: { type: Number, min: 0, required: true },
  },
  {
    _id: true,
  }
);
const Set = new mongoose.Schema({
  reps: { type: Number, min: 1, required: true },
  weight: { type: Number, min: 0, required: true },
  checked: { type: Boolean, default: false, required: true },
});
const Exercise = new mongoose.Schema(
  {
    name: { type: String, required: true },
    sets: [Set],
  },
  {
    _id: true,
  }
);
const Template = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: true },
  createdAt: { type: Date, required: true },
  exerciseTemplates: [ExerciseTemplate],
});
Template.index({ user: 1, name: 1 }, { unique: true });
const Workout = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: true },
  completedAt: { type: Date, required: true },
  completed: { type: Boolean, default: false, required: true },
  exercises: [Exercise],
});
const User = new mongoose.Schema({
  // templates: [{ type: mongoose.Schema.Types.ObjectId, ref: "Template" }],
  // workouts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Workout" }],
});
User.plugin(passportLocalMongoose);

Workout.plugin(URLSlugs("name"));

module.exports = {
  db: mongoose.connect(process.env.DB_CONN),
  User: mongoose.model("User", User),
  Template: mongoose.model("Template", Template),
  Workout: mongoose.model("Workout", Workout),
  Exercise: mongoose.model("Exercise", Exercise),
  Set: mongoose.model("Set", Set),
  ExerciseTemplate: mongoose.model("ExerciseTemplate", ExerciseTemplate),
};
