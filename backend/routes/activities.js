const express = require("express");
const auth = require("../middleware/auth");
const Activity = require("../models/activitymodels");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const activities = await Activity.find({ userId: req.user.id });
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ message: "Error fetching activities", error });
  }
});

router.post("/", auth, async (req, res) => {
  const { date, activity } = req.body;

  if (!date || !activity) {
    return res.status(400).json({ message: "Date and activity are required" });
  }

  try {
    const newActivity = new Activity({ userId: req.user.id, date, activity });
    await newActivity.save();
    res.status(201).json(newActivity);
  } catch (error) {
    res.status(500).json({ message: "Error creating activity", error });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const deletedActivity = await Activity.findByIdAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!deletedActivity) {
      return res.status(404).json({ message: "Activity not found" });
    }
    res.status(200).json({ message: "Activity deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting activity", error });
  }
});

module.exports = router;
