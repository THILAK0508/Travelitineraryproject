const express = require("express");
const auth = require("../middleware/auth");
const Checklist = require("../models/checklistmodels");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const items = await Checklist.find({ userId: req.user.id });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Error fetching items", error });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const { item } = req.body;
    const newItem = new Checklist({ userId: req.user.id, item });
    await newItem.save();
    res.status(201).json({ message: "Item added successfully", item: newItem });
  } catch (error) {
    res.status(500).json({ message: "Error adding item", error });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const deletedItem = await Checklist.findByIdAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json({ message: "Item removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting item", error });
  }
});

module.exports = router;
