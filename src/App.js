import { useEffect, useState } from "react";
import "./App.css";

import WeatherDashboard from "./components/WeatherDashboard";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=-34.7163&longitude=-58.7946&current=temperature_2m,relativehumidity_2m,windspeed_10m,winddirection_10m&hourly=temperature_2m,relativehumidity_2m,visibility,uv_index&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&timezone=America%2FAnchorage&forecast_days=1`;
        const response = await fetch(apiUrl); // Make the fetch request
        if (!response.ok) {
          throw new Error("Network response was not ok"); // Handle non-2xx responses
        }

        const data = await response.json(); // Parse the response as JSON
        setData(data);
        // Process the data or return it
        console.log("Data:", data);
        return data;
      } catch (error) {
        console.error("Error:", error.message);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="App">
      {data ? <WeatherDashboard data={data} /> : "Loading"}
    </div>
  );
}

export default App;
