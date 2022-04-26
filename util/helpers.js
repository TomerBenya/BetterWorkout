module.exports = {
  formatDate(date) {
    return date.toDateString();
  },
  add(a, b) {
    return a + b;
  },
  for(context, options) {
    let accum = "";
    for (let i = 0; i < context; ++i)
      accum += options.fn({
        index: i,
      });
    return accum;
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
