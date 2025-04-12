import './WeatherCard.css';

const WeatherCard = ({ weatherData }) => {
  if (!weatherData) return null;

  const { 
    city, 
    country, 
    temperature, 
    feels_like,
    humidity, 
    weather, 
    description, 
    icon, 
    wind, 
    timestamp 
  } = weatherData;

  // Format the timestamp
  const formattedTime = new Date(timestamp).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  // Weather icon URL
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <div className="weather-card">
      <div className="weather-header">
        <h2>{city}, {country}</h2>
        <p className="timestamp">Last updated: {formattedTime}</p>
      </div>

      <div className="weather-body">
        <div className="weather-main">
          <img src={iconUrl} alt={description} className="weather-icon" />
          <div className="weather-temp">
            <h1>{Math.round(temperature)}°C</h1>
            <p className="weather-description">{weather}</p>
            <p className="weather-description-detail">{description}</p>
          </div>
        </div>

        <div className="weather-details">
          <div className="weather-detail-item">
            <span className="detail-label">Feels Like</span>
            <span className="detail-value">{Math.round(feels_like)}°C</span>
          </div>
          <div className="weather-detail-item">
            <span className="detail-label">Humidity</span>
            <span className="detail-value">{humidity}%</span>
          </div>
          <div className="weather-detail-item">
            <span className="detail-label">Wind Speed</span>
            <span className="detail-value">{wind.speed} m/s</span>
          </div>
          <div className="weather-detail-item">
            <span className="detail-label">Wind Direction</span>
            <span className="detail-value">{wind.deg}°</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;