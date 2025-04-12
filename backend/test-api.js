const axios = require('axios');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const apiKey = process.env.RAPID_API_KEY;
console.log("Using API Key:", apiKey); // Will be masked in output, just checking if it exists

const options = {
  method: 'GET',
  url: 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather',
  params: { city: 'Seattle' },
  headers: {
    'x-rapidapi-key': apiKey,
    'x-rapidapi-host': 'weather-by-api-ninjas.p.rapidapi.com'
  }
};

async function fetchData() {
  try {
    const response = await axios.request(options);
    console.log("API Response Success:");
    console.log(response.data);
  } catch (error) {
    console.error("API Error:");
    if (error.response) {
      console.error(error.response.data);
      console.error("Status:", error.response.status);
    } else {
      console.error(error.message);
    }
  }
}

fetchData();