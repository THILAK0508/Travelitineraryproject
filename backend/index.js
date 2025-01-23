const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

// Importing the routes
const authRoutes = require("./middleware/authRoutes");
const cardsRoutes = require("./routes/cards");
const tripsRoutes = require("./routes/trips");
const activitiesRoutes = require("./routes/activities");
const budgetsRoutes = require("./routes/budgets");
const checklistRoutes = require("./routes/checklist");
const itineraryRoutes = require("./routes/itinerary");

const app = express();
const EventEmitter = require("events");
const bus = new EventEmitter();
bus.setMaxListeners(20);

// Middleware
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// Routes for the APIs
app.use("/api/auth", authRoutes);
app.use("/api/cards", cardsRoutes);
app.use("/api/trips", tripsRoutes);
app.use("/api/activities", activitiesRoutes);
app.use("/api/budgets", budgetsRoutes);
app.use("/api/checklist", checklistRoutes);
app.use("/api/itinerary", itineraryRoutes);

app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
