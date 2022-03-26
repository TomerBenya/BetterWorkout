const mongoose = require("mongoose"),
  URLSlugs = require("mongoose-url-slugs"),
  passportLocalMongoose = require("passport-local-mongoose");

const User = new mongoose.Schema({
  // username, password
  username: { type: String, required: true },
  passwordHash: { type: String, required: true },
  templates: [{ type: mongoose.Schema.Types.ObjectId, ref: "template" }],
  workouts: [{ type: mongoose.Schema.Types.ObjectId, ref: "workout" }],
});

const exerciseTemplate = new mongoose.Schema(
  {
    name: { type: String, required: true },
    sets: { type: Number, min: 1, required: true },
    reps: { type: Number, min: 1, required: true },
    increment: { type: Number, min: 0, required: true },
    createdAt: { type: Date, required: true },
  },
  {
    _id: true,
  }
);

const set = new mongoose.Schema({
  reps: { type: Number, min: 1, required: true },
  weight: { type: Number, min: 0, required: true },
  checked: { type: Boolean, default: false, required: true },
});

const exercise = new mongoose.Schema(
  {
    name: { type: String, required: true },
    sets: [set],
  },
  {
    _id: true,
  }
);

const Workout = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: true },
  completedAt: { type: Date, required: true },
  completed: { type: Boolean, default: false, required: true },
  exercises: [exercise],
});

const Template = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: true },
  createdAt: { type: Date, required: true },
  exerciseTemplates: [exerciseTemplate],
});

User.plugin(passportLocalMongoose);
List.plugin(URLSlugs("name"));

mongoose.model("User", User);
mongoose.model("template", Template);
mongoose.model("Workout", Workout);
mongoose.model("exercise", exercise);
mongoose.model("set", set);
mongoose.model("exerciseTemplate", exerciseTemplate);
mongoose.connect("mongodb://localhost/workoutdb");
