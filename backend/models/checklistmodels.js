const mongoose = require("mongoose");

const checklistSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    item: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Checklist = mongoose.model("Checklist", checklistSchema);

module.exports = Checklist;
