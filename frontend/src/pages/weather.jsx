import React, { useState } from "react";
import "../css/weather.css";
import Header from "../components/header";
import Footer from "../components/footer";
const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherDetails, setWeatherDetails] = useState(
    "Enter a city to get weather updates."
  );
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiKey = "f7f8020fb6f062b24f4fb8363d34569c"; // Replace with your API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.cod === 200) {
        const weatherDescription = data.weather[0].description;
        const temperature = data.main.temp;
        const cityName = data.name;
        setWeatherDetails(
          `${cityName}: ${weatherDescription}, ${temperature}°C`
        );
        setError(null);
      } else {
        setWeatherDetails(`Weather data for "${city}" not found.`);
        setError(true);
      }
    } catch (error) {
      setWeatherDetails(`Error fetching weather data: ${error.message}`);
      setError(true);
    }
  };

  return (
    <div>
      <Header />

      <div className="container">
        <section className="weather-info">
          <h2>Check the Weather</h2>

          <form onSubmit={handleSubmit}>
            <label htmlFor="city">Enter City:</label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="e.g., New York"
              required
            />
            <button type="submit">Get Weather</button>
          </form>

          <div className="weather-result">
            <h3>Weather Details</h3>
            <p style={{ color: error ? "red" : "black" }}>{weatherDetails}</p>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Weather;
