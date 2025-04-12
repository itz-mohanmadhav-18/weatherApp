const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Debug route to test API connection
app.get('/api/test', async (req, res) => {
  try {
    const apiKey = process.env.RAPID_API_KEY;
    console.log('Using API Key:', apiKey.substring(0, 5) + '...');
    
    const options = {
      method: 'GET',
      url: 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather',
      params: { city: 'Seattle' },
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': 'weather-by-api-ninjas.p.rapidapi.com'
      }
    };
    
    console.log('Making API request with options:', JSON.stringify({
      url: options.url,
      params: options.params,
      headers: {
        'x-rapidapi-host': options.headers['x-rapidapi-host'],
        'x-rapidapi-key': '***' // Masked for security
      }
    }));
    
    const response = await axios.request(options);
    console.log('API response received:', response.data);
    res.json({ success: true, data: response.data });
  } catch (error) {
    console.error('API Test Error:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
      console.error('Headers:', error.response.headers);
      res.status(error.response.status).json({
        error: 'API Error',
        details: error.response.data,
        status: error.response.status
      });
    } else if (error.request) {
      console.error('No response received:', error.request);
      res.status(500).json({ error: 'No response from API server' });
    } else {
      console.error('Error:', error.message);
      res.status(500).json({ error: error.message });
    }
  }
});

// Weather route
app.get('/api/weather', async (req, res) => {
  try {
    const { city } = req.query;
    
    if (!city) {
      return res.status(400).json({ error: 'City name is required' });
    }
    
    const apiKey = process.env.RAPID_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'API key not configured' });
    }
    
    // Updated headers to match RapidAPI requirements
    const options = {
      method: 'GET',
      url: 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather',
      params: { city },
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': 'weather-by-api-ninjas.p.rapidapi.com'
      }
    };
    
    const response = await axios.request(options);
    
    // Transform the response to match your frontend expectations
    const weatherData = {
      city: city,
      country: '', // API-Ninjas doesn't provide country info
      temperature: response.data.temp,
      feels_like: response.data.feels_like,
      humidity: response.data.humidity,
      pressure: response.data.cloud_pct, // Using cloud percentage as there's no direct pressure equivalent
      weather: response.data.cloud_pct > 50 ? 'Cloudy' : 'Clear',
      description: response.data.cloud_pct > 50 ? 'Cloudy conditions' : 'Clear sky',
      icon: response.data.cloud_pct > 50 ? '04d' : '01d', // Approximating icon codes
      wind: {
        speed: response.data.wind_speed,
        deg: response.data.wind_degrees
      },
      timestamp: new Date()
    };
    
    res.json(weatherData);
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    
    if (error.response) {
      console.error('API Response Error:', error.response.data);
      console.error('Status:', error.response.status);
      
      if (error.response.status === 404) {
        return res.status(404).json({ error: 'City not found' });
      }
      
      return res.status(error.response.status).json({ 
        error: 'API Error', 
        details: error.response.data 
      });
    }
    
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Test API connection at: http://localhost:${PORT}/api/test`);
});