import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/budget.css";
import Header from "../components/header";
import Footer from "../components/footer";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Budget = () => {
  const [tripName, setTripName] = useState("");
  const [accommodation, setAccommodation] = useState("");
  const [transportation, setTransportation] = useState("");
  const [food, setFood] = useState("");
  const [activities, setActivities] = useState("");
  const [miscellaneous, setMiscellaneous] = useState("");
  const [totalBudget, setTotalBudget] = useState(0);
  const [savedBudgets, setSavedBudgets] = useState([]);
  const [showSavedBudgets, setShowSavedBudgets] = useState(false);

  // Calculate the total budget
  const handleCalculate = (e) => {
    e.preventDefault();
    const total =
      (parseFloat(accommodation) || 0) +
      (parseFloat(transportation) || 0) +
      (parseFloat(food) || 0) +
      (parseFloat(activities) || 0) +
      (parseFloat(miscellaneous) || 0);
    setTotalBudget(total);
  };

  // Save the budget
  const saveBudget = async () => {
    if (!tripName || totalBudget === 0) {
      alert("Please enter a trip name and calculate the budget.");
      return;
    }

    const budgetData = {
      tripName,
      accommodation: parseFloat(accommodation) || 0,
      transportation: parseFloat(transportation) || 0,
      food: parseFloat(food) || 0,
      activities: parseFloat(activities) || 0,
      miscellaneous: parseFloat(miscellaneous) || 0,
      totalBudget,
    };

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/budgets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(budgetData),
      });

      if (response.ok) {
        alert("Budget saved successfully!");
        setTripName("");
        setAccommodation("");
        setTransportation("");
        setFood("");
        setActivities("");
        setMiscellaneous("");
        setTotalBudget(0);
      } else {
        alert("Error saving budget.");
      }
    } catch (error) {
      console.error("Error saving budget:", error);
      alert("Error saving budget.");
    }
  };

  const fetchSavedBudgets = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/budgets`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setSavedBudgets(data);
    } catch (error) {
      console.error("Error fetching budgets:", error);
      alert("Error fetching budgets.");
    }
  };

  // Toggle display of saved budgets
  const handleViewSavedBudgets = () => {
    if (!showSavedBudgets) {
      fetchSavedBudgets();
    }
    setShowSavedBudgets(!showSavedBudgets);
  };

  return (
    <div>
      <Header />

      <div className="container">
        <section className="budget-calculator">
          <h2>Calculate Your Trip Budget</h2>
          <form onSubmit={handleCalculate}>
            <label htmlFor="trip-name">Trip Name:</label>
            <input
              type="text"
              id="trip-name"
              placeholder="Enter trip name"
              value={tripName}
              onChange={(e) => setTripName(e.target.value)}
              required
            />

            <label htmlFor="accommodation">Accommodation:</label>
            <input
              type="number"
              id="accommodation"
              placeholder="Enter amount"
              value={accommodation}
              onChange={(e) => setAccommodation(e.target.value)}
              required
            />

            <label htmlFor="transportation">Transportation:</label>
            <input
              type="number"
              id="transportation"
              placeholder="Enter amount"
              value={transportation}
              onChange={(e) => setTransportation(e.target.value)}
              required
            />

            <label htmlFor="food">Food:</label>
            <input
              type="number"
              id="food"
              placeholder="Enter amount"
              value={food}
              onChange={(e) => setFood(e.target.value)}
              required
            />

            <label htmlFor="activities">Activities:</label>
            <input
              type="number"
              id="activities"
              placeholder="Enter amount"
              value={activities}
              onChange={(e) => setActivities(e.target.value)}
              required
            />

            <label htmlFor="miscellaneous">Miscellaneous:</label>
            <input
              type="number"
              id="miscellaneous"
              placeholder="Enter amount"
              value={miscellaneous}
              onChange={(e) => setMiscellaneous(e.target.value)}
              required
            />

            <button type="submit">Calculate Budget</button>
            <button type="button" onClick={saveBudget}>
              Save Budget
            </button>
          </form>

          <div className="budget-result">
            <h3>Total Budget:</h3>
            <p id="totalBudget">₹{totalBudget.toFixed(2)}</p>
          </div>
        </section>

        <button onClick={handleViewSavedBudgets}>
          {showSavedBudgets ? "Hide Saved Budgets" : "View Saved Budgets"}
        </button>

        {showSavedBudgets && (
          <section className="saved-budgets">
            <h2>Saved Budgets</h2>
            <ul>
              {savedBudgets.length > 0 ? (
                savedBudgets.map((budget) => (
                  <li key={budget._id}>
                    <strong>{budget.tripName}</strong> <br />
                    Total Budget: ₹{budget.totalBudget.toFixed(2)} <br />
                    Accommodation: ₹{budget.accommodation} <br />
                    Transportation: ₹{budget.transportation} <br />
                    Food: ₹{budget.food} <br />
                    Activities: ₹{budget.activities} <br />
                    Miscellaneous: ₹{budget.miscellaneous}
                  </li>
                ))
              ) : (
                <p>No saved budgets yet.</p>
              )}
            </ul>
          </section>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Budget;
