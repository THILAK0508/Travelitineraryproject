import React, { useState, useEffect } from 'react';
import Header from '../components/header';
import '../css/itinerary.css';
import Footer from '../components/footer';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const Itinerary = () => {
  const [days, setDays] = useState([]);
  const [dayTitle, setDayTitle] = useState('');
  const [dayDetails, setDayDetails] = useState('');

  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/api/itinerary`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setDays(data);
      } catch (error) {
        console.error('Error fetching itinerary:', error);
      }
    };

    fetchItinerary();
  }, []);

  // Handle adding a new itinerary day
  const handleAddDay = async (e) => {
    e.preventDefault();

    if (!dayTitle.trim() || !dayDetails.trim()) {
      alert('Please fill in both title and details.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/itinerary`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ title: dayTitle, details: dayDetails }),
      });

      const newDay = await response.json();

      if (newDay) {
        
        setDays((prevDays) => [...prevDays, newDay.itinerary]);
        setDayTitle('');
        setDayDetails('');
      } else {
        alert('Error adding day to itinerary');
      }
    } catch (error) {
      console.error('Error saving day to itinerary :', error);
    }
  };

  // Handle deleting an itinerary day
  const handleDeleteDay = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/itinerary/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const result = await response.json();
      if (result) {
        setDays((prevDays) => prevDays.filter((day) => day._id !== id));
      } else {
        alert('Error deleting day');
      }
    } catch (error) {
      console.error('Error deleting day from itinerary:', error);
    }
  };

  return (
    <div className="container">
      <Header />

      <section className="itinerary">
        <h2>Your Planned Itinerary</h2>

        {/* Form to Add Itinerary Day */}
        <div className="itinerary-form">
          <form onSubmit={handleAddDay}>
            <input
              type="text"
              placeholder="Day Title (e.g., Day 1: Arrival)"
              value={dayTitle}
              onChange={(e) => setDayTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Enter activities, timings, or notes for this day"
              value={dayDetails}
              onChange={(e) => setDayDetails(e.target.value)}
              required
            ></textarea>
            <button type="submit">Add to Itinerary</button>
          </form>
        </div>

        <div id="itinerary-list">
          <h3>Planned Days</h3>
          <ul>
            {days.map((day) => (
              <li key={day._id}>
                <h4>{day.title}</h4>
                <p>{day.details}</p>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteDay(day._id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Itinerary;
