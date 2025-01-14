import React, { useEffect, useState } from "react";
import "../css/destinations.css";
import Header from "../components/header";
import Footer from "../components/footer";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_URL = `${API_BASE_URL}/api/cards`;  // Corrected API URL

function Destination() {
  const [cardsData, setCardsData] = useState([]);
  const [nearYouData, setNearYouData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setCardsData(data.cardsData);  // Data for popular destinations
        setNearYouData(data.nearYou);  // Data for "Near You"
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <div className="destinations-container">
        <h2>Popular Destinations</h2>
        <div className="cards-container">
          {cardsData.map((card, index) => (
            <div key={index} className="card">
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          ))}
        </div>
        <h2>Near You</h2>
        <div className="cards-container">
          {nearYouData.map((card, index) => (
            <div key={index} className="card">
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Destination;