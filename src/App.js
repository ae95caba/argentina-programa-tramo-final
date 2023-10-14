import { useEffect, useState } from "react";
import "./App.css";

import WeatherDashboard from "./components/WeatherDashboard";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [airPolutionData, setAirPolutionData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const airPolutionApiUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=-34.7163&longitude=-58.7946&current=us_aqi&timezone=auto&forecast_days=1`;
        const weatherApiUrl = `https://api.open-meteo.com/v1/forecast?latitude=-34.7163&longitude=-58.7946&current=temperature_2m,relativehumidity_2m,windspeed_10m,winddirection_10m&hourly=temperature_2m,relativehumidity_2m,visibility,uv_index&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&timezone=America%2FAnchorage&forecast_days=1`;
        const weatherResponse = await fetch(weatherApiUrl); // Make the fetch request
        const airPolutionrResponse = await fetch(airPolutionApiUrl); // Make the fetch request
        if (!weatherResponse.ok || !airPolutionrResponse) {
          throw new Error("Network response was not ok"); // Handle non-2xx responses
        }

        const weatherData = await weatherResponse.json(); // Parse the response as JSON
        const airPolutionData = await airPolutionrResponse.json();
        setAirPolutionData(airPolutionData);
        setWeatherData(weatherData);
        // Process the data or return it
        console.log("Data:", weatherData);
        return weatherData;
      } catch (error) {
        console.error("Error:", error.message);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="App">
      {weatherData ? (
        <WeatherDashboard
          data={weatherData}
          airPolutionData={airPolutionData}
        />
      ) : (
        "Loading"
      )}
    </div>
  );
}

export default App;
