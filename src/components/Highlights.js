import React from "react";
import WeatherCard from "./WeatherCard";
import sunset from "../assets/sunset.svg";
import { data } from "../data";
import sunrise from "../assets/sunrise.svg";
import { ISO8601DateStringToHHMMString } from "../functions";
export default function Highlights() {
  const sunriseDateString = data.daily.sunrise;
  const sunriseHHMM = ISO8601DateStringToHHMMString(sunriseDateString);
  const sunsetDateString = data.daily.sunset;
  const sunsetHHMM = ISO8601DateStringToHHMMString(sunsetDateString);
  return (
    <section className="highlights">
      <h2>Highlights</h2>
      <div className="cards-container">
        <WeatherCard title={"UV INDEX"}>{data.daily.uv_index_max}</WeatherCard>
        <WeatherCard title={"WIND STATUS"}>
          {data.current_weather.windspeed} {data.daily_units.windspeed_10m_max}
        </WeatherCard>
        <WeatherCard className={"sunrise-sunset"} title={"SUNRISE & SUNSET"}>
          <div className="subcontainer">
            <p className="sunrise">{sunriseHHMM}</p>
            <img src={sunrise} alt="" />
          </div>
          <div className="subcontainer">
            <p className="sunset">{sunsetHHMM}</p> <img src={sunset} alt="" />
          </div>
        </WeatherCard>
        <WeatherCard title={"HUMIDITY"}>
          {data.hourly.relativehumidity_2m[0]}
          {data.hourly_units.relativehumidity_2m}
        </WeatherCard>
        <WeatherCard title="VISIBILITY">
          {data.hourly.visibility[0]} {data.hourly_units.visibility}
        </WeatherCard>
        <WeatherCard title="AIR QUALITY"></WeatherCard>
      </div>
    </section>
  );
}
