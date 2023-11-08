import { useEffect, useState, useRef } from "react";
import "./App.css";
import DataContext from "./contexts/DataContext";
import WeatherDashboard from "./components/WeatherDashboard";
import TransportDashboard from "./components/TransportDashboard";

function App() {
  const [weatherData, setWeatherData] = useState(null);

  const [airPolutionData, setAirPolutionData] = useState(null);

  const [inputValue, setInputValue] = useState(null);

  const dataListRef = useRef(null);
  /*   const [selet] */

  const [options, setOptions] = useState(null);

  async function fetchApi() {
    try {
      const url = `https://geocoding-api.open-meteo.com/v1/search?name=${inputValue}&count=5&language=es&format=json`;
      const response = await fetch(url);
      const data = await response.json();
      const results = data.results;
      console.log("------------------");
      console.log(`data is : ${JSON.stringify(data)}`);
      console.log(`results is: ${results}`);
      const transformedResults = results?.map((result) => {
        return { name: result.name, city: result.admin1 };
      });
      setOptions(transformedResults);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchApi();
  }, [inputValue]);

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
        <div className="weather-dashboard-container">
          <DataContext.Provider value={{ data: weatherData, airPolutionData }}>
            <WeatherDashboard />
          </DataContext.Provider>
          <div className="searchbox">
            <input
              list="input"
              placeholder="asdf"
              onInput={(e) => {
                setInputValue(e.target.value);
              }}
            />
            <button
              onClick={() => {
                console.log(dataListRef.current);
              }}
            >
              Buscar
            </button>
            <ul>
              {options?.map((option) => {
                return (
                  <li>
                    {option.name} {option.city}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      ) : (
        "Loading"
      )}
      <TransportDashboard />
    </div>
  );
}

export default App;
