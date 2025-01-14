const express = require("express");
const auth = require("../middleware/auth");
const Trip = require("../models/tripmodels");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const trips = await Trip.find({ userId: req.user.id });
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ message: "Error fetching trips", error });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const { tripName, startDate, endDate, destination, travelers } = req.body;

    const newTrip = new Trip({
      userId: req.user.id,
      tripName,
      startDate,
      endDate,
      destination,
      travelers,
    });

    await newTrip.save();
    res.status(201).json(newTrip);
  } catch (error) {
    res.status(500).json({ message: "Error saving trip", error });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const trip = await Trip.findByIdAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }
    res.status(200).json({ message: "Trip deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting trip", error });
  }
});

module.exports = router;
