const express = require("express");
const auth = require("../middleware/auth");
const Itinerary = require("../models/itinerarymodels");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const itinerary = await Itinerary.find({ userId: req.user.id });
    res.status(200).json(itinerary);
  } catch (error) {
    res.status(500).json({ message: "Error fetching itinerary", error });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const { title, details } = req.body;
    if (!title || !details) {
      return res.status(400).json({ message: "Title and details are required." });
    }

    const newItineraryDay = new Itinerary({ userId: req.user.id, title, details });
    await newItineraryDay.save();

    res.status(201).json({ itinerary: newItineraryDay });
  } catch (error) {
    res.status(500).json({ message: "Error saving itinerary day", error });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const item = await Itinerary.findOneAndDelete({ _id: req.params.id, userId: req.user.id });

    if (!item) {
      return res.status(404).json({ message: "Item not found or not authorized." });
    }

    res.status(200).json({ message: "Item removed successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error removing item.", error });
  }
});

module.exports = router;
