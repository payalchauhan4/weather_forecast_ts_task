import React, { useState } from 'react';
import axios from 'axios';
import './weather.css'; 

const Weather: React.FC = () => {
  const [city, setCity] = useState<string>('');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const API_URL = `https://freetestapi.com/api/v1/weathers?city=${encodeURIComponent(city)}`;

  const fetchWeather = async () => {
    try {
      const response = await axios.get(API_URL);
      setWeatherData(response.data);
      setError(null);
    } catch (error) {
      setError('Unable to fetch weather data. Please try again.');
      setWeatherData(null);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchWeather();
  };

  const handleClear = () => {
    setCity('');
    setWeatherData(null);
    setError(null);
  };

  const renderWeatherDetails = () => {
    if (!weatherData) return null;

    const cityWeather = weatherData.find((item: any) => item.city.toLowerCase() === city.toLowerCase());

    if (!cityWeather) {
      return <p className="error">No weather data found for {city}.</p>;
    }

    return (
      <div>
      <h2>Current Weather for {city}</h2>
      <p>Temperature: {cityWeather.temperature}°C</p>
      <p>Country: {cityWeather.country}</p>
      <p>Description: {cityWeather.weather_description}</p>
      <p>Wind Speed: {cityWeather.wind_speed}</p>
      
      {cityWeather.forecast && cityWeather.forecast.length > 0 && (
        <div>
          <h2>Forecast</h2>
          {cityWeather.forecast.map((forecastItem: any, index: number) => (
            <div key={index}>
                <b>Day: {index + 1}</b>
              <p>Date: {forecastItem.date}</p>
              <p>Temperature: {forecastItem.temperature}°C</p>
              <p>Description: {forecastItem.weather_description}</p>
              <p>Wind Speed: {forecastItem.wind_speed}</p>
            </div>
          ))}
        </div>
      )}
    </div>
    );
  };

  return (
    <div className="weather-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={handleInputChange}
          placeholder="Enter city name"
        />
        <button type="submit">Get Weather</button>
        <button type="button" onClick={handleClear}>Clear</button>
      </form>
      {error && <p className="error">{error}</p>}
      {renderWeatherDetails()}
    </div>
  );
};

export default Weather;
