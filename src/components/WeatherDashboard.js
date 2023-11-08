import React from "react";
import { useState, useContext } from "react";
import MinMaxTemp from "./MinMaxTemp";
import CurrentTemp from "./CurrentTemp";
import Highlights from "./Highlights";
import { BarChart } from "./BarChart";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import DataContext from "../contexts/DataContext";
import { ISO8601DateStringToHHMMString } from "../functions";
Chart.register(CategoryScale);

export default function WeatherDashboard() {
  const { data } = useContext(DataContext);
  const [hourlyTemperature, setHourlyTemperature] = useState({
    labels: data.hourly.time.map((timeString, index) => {
      if (index % 2 === 0) {
        const timeStringHHMM = ISO8601DateStringToHHMMString(timeString);
        return timeStringHHMM;
      }
    }),
    datasets: [
      {
        label: "Temperatura por ahora",
        data: data.hourly.temperature_2m.map((temperature, index) => {
          if (index % 2 == 0) {
            return temperature;
          }
        }),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  return (
    <div className="weather-dashboard">
      <Highlights />
      <div className="temperature">
        <MinMaxTemp />
        <CurrentTemp />
      </div>
      <BarChart chartData={hourlyTemperature} />
    </div>
  );
}
