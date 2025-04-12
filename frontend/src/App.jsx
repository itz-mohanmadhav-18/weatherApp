import { useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (city) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`http://localhost:5000/api/weather?city=${encodeURIComponent(city)}`);
      setWeatherData(response.data);
    } catch (err) {
      setWeatherData(null);
      if (err.response && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('Failed to fetch weather data. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="weather-app">
        <header className="app-header">
          <h1>Weather Dashboard</h1>
          <p>Enter a city name to get the current weather</p>
        </header>
        
        <main className="app-content">
          <SearchBar onSearch={handleSearch} isLoading={loading} />
          
          {loading && (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Fetching weather data...</p>
            </div>
          )}
          
          {error && (
            <div className="error-container">
              <p className="error-message">{error}</p>
            </div>
          )}
          
          {weatherData && !loading && !error && (
            <WeatherCard weatherData={weatherData} />
          )}
        </main>
        
        <footer className="app-footer">
          <p>Weather data provided by OpenWeatherMap</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
