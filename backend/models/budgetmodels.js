const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  tripName: {
    type: String,
    required: true,
  },
  accommodation: {
    type: Number,
    required: true,
    default: 0,
  },
  transportation: {
    type: Number,
    required: true,
    default: 0,
  },
  food: {
    type: Number,
    required: true,
    default: 0,
  },
  activities: {
    type: Number,
    required: true,
    default: 0,
  },
  miscellaneous: {
    type: Number,
    required: true,
    default: 0,
  },
  totalBudget: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

const Budget = mongoose.model("Budget", budgetSchema);

module.exports = Budget;
