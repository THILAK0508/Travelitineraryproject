import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/features.css";

const Features = () => {
  const navigate = useNavigate();

  const features = [
    { name: "Destinations", description: "Explore top travel spots worldwide.", icon: "🌍", route: "/destination" },
    { name: "Trip Planner", description: "Organize your entire trip in one place.", icon: "🗺️", route: "/planner" },
    { name: "Activity Scheduler", description: "Plan daily activities and adventures.", icon: "📅", route: "/scheduler" },
    { name: "Budget Calculator", description: "Keep track of travel expenses.", icon: "💰", route: "/budget" },
    { name: "Weather", description: "Check the weather forecast for your destination.", icon: "☀️", route: "/weather" },
    { name: "Packing Checklist", description: "Ensure you pack everything you need.", icon: "🧳", route: "/packing" },
    { name: "Calendar", description: "Stay on top of your travel schedule.", icon: "📆", route: "/calendar" },
    { name: "Itinerary", description: "Create and share your travel itinerary.", icon: "📝", route: "/itinerary" },
  ];

  return (
    <div className="features-container">
      <h2 className="features-title">Experience these features</h2>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div
            key={index}
            className="feature-card"
            onClick={() => navigate(feature.route)} 
          >
            <div className="feature-icon">{feature.icon}</div>
            <h3 className="feature-name">{feature.name}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
