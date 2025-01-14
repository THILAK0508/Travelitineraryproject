const express = require("express");
const auth = require("../middleware/auth");
const Budget = require("../models/budgetmodels");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const budgets = await Budget.find({ userId: req.user.id });
    res.status(200).json(budgets);
  } catch (error) {
    res.status(500).json({ message: "Error fetching budgets", error });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const { tripName, accommodation, transportation, food, activities, miscellaneous, totalBudget } = req.body;

    const newBudget = new Budget({
      userId: req.user.id,
      tripName,
      accommodation,
      transportation,
      food,
      activities,
      miscellaneous,
      totalBudget,
    });

    await newBudget.save();
    res.status(201).json({ message: "Budget saved successfully!", budget: newBudget });
  } catch (error) {
    res.status(500).json({ message: "Error saving budget.", error });
  }
});

module.exports = router;
