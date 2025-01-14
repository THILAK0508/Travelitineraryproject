const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: { type: String, required: true },
  activity: { type: String, required: true },
});

module.exports = mongoose.model("Activity", activitySchema);
