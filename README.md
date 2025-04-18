# Weather Dashboard

A real-time weather dashboard application built with React (frontend) and Node.js/Express (backend) that allows users to search for current weather conditions by city name.

## Features

- Search for weather by city name
- Display of current temperature, weather conditions, humidity, and wind information
- Error handling for invalid city names or network issues
- Responsive design for mobile and desktop

## Technologies Used

### Frontend
- React (with Vite)
- Axios for API requests
- CSS for styling

### Backend
- Node.js
- Express
- Axios for external API requests
- dotenv for environment variables

## Project Structure

```
weather-dashboard/
├── frontend/              # React Frontend
│   ├── src/
│   │   ├── components/    # WeatherCard, SearchBar components
│   │   ├── App.jsx        # Main application component
│   │   └── main.jsx       # Entry point
│   └── package.json
├── backend/               # Node.js Backend
│   ├── server.js          # Express server and weather API endpoint
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or newer)
- npm (comes with Node.js)
- OpenWeatherMap API key (get one at https://openweathermap.org/appid)

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the backend directory with your OpenWeatherMap API key:
   ```
   OPENWEATHER_API_KEY=your_api_key_here
   PORT=5000
   ```

4. Start the backend server:
   ```
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the frontend development server:
   ```
   npm run dev
   ```

4. Open your browser and go to the URL shown in your terminal (typically http://localhost:5173)

## Usage

1. Enter a city name in the search box
2. Click the "Search" button
3. View the current weather information for the specified city

