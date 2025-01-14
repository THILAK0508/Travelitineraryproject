const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  tripName: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  destination: { type: String, required: true },
  travelers: { type: Number, required: true },
});

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;
