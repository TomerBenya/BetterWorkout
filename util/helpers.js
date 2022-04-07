module.exports = {
  add: function (a, b) {
    return a + b;
  },
  motivationalMessage() {
    const messages = [
      "Let's get yolked!",
      "Ready to get pumped up?",
      "You are the juice!",
      "Ready to lift heavy!?",
      "Did you take your pre?",
      "Slay it queen!",
      "Looking extra swole!",
      "Leave the excuses at the door!",
      "Time to get jacked",
      "Dont be a lump, chase the pump!",
      "Take your creatine so you don't turn green!",
    ];

    return messages[~~(Math.random() * messages.length)];
  },
};
