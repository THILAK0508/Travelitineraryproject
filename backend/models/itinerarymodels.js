const mongoose = require('mongoose');

const itinerarySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: { type: String, required: true },
  details: { type: String, required: true },
});

const Itinerary = mongoose.model('Itinerary', itinerarySchema);

module.exports = Itinerary;
