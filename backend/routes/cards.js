const express = require("express");
const { Card, YouMayLike, NearYou } = require("../models/cardmodels");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const popularDestinations = await Card.find({}).limit(10);
    const youMayLike = await YouMayLike.find({}).limit(10);
    const nearYou = await NearYou.find({}).limit(10);

    res.json({
      cardsData: popularDestinations,
      youMayLike,
      nearYou,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error });
  }
});

module.exports = router;
