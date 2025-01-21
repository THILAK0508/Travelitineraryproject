import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/homepage.css";
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import Features from "./features.jsx";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_URL = `${API_BASE_URL}/api/cards`;  
const USER_API_URL = `${API_BASE_URL}/api/auth/user`; 
const Homepage = () => {
  const [cardsData, setCardsData] = useState([]);
  const [youMayLike, setYouMayLike] = useState([]);
  const [nearYou, setNearYou] = useState([]);
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setCardsData(data.cardsData);    
        setYouMayLike(data.youMayLike);  
        setNearYou(data.nearYou);        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token"); 
        if (!token) {
          setError("No token found. Please log in.");
          return;
        }

        const response = await fetch(USER_API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setUsername(data.username); 
        } else {
          setError(data.message || "Failed to fetch user data.");
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("An error occurred while fetching user data.");
      }
    };

    fetchUserData();
  }, []);
  return (
    <div className="homepage">
      <Header />

      <div className="welcome">
       <h2>Welcome, {username}!</h2>
        <p>Plan your next adventure and organize all your travel details in one place.</p>
      </div>


      <Features />

      <div id="categories-wrapper">
        {/* Cards Data */}
        <div className="category-section">
          <h2>Popular Destinations</h2>
          <div className="grid-container">
            {cardsData.map((card) => (
              <div key={card._id} className="grid-item">
                <img src={card.image} alt={card.title} />
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* You May Like  */}
        <div className="category-section">
          <h2>You May Like</h2>
          <div className="grid-container">
            {youMayLike.map((card) => (
              <div key={card._id} className="grid-item">
                <img src={card.image} alt={card.title} />
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Near You  */}
        <div className="category-section">
          <h2>Near You</h2>
          <div className="grid-container">
            {nearYou.map((card) => (
              <div key={card._id} className="grid-item">
                <img src={card.image} alt={card.title} />
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Homepage;
