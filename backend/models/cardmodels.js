const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
});

const Card = mongoose.model("Card", cardSchema, "cardsData");
const YouMayLike = mongoose.model("YouMayLike", cardSchema, "youMayLike");
const NearYou = mongoose.model("NearYou", cardSchema, "nearYou");


module.exports = { Card, YouMayLike, NearYou };
