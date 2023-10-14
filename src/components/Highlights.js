import React, { useContext } from "react";
import WeatherCard from "./WeatherCard";
import sunset from "../assets/sunset.svg";
import DataContext from "../contexts/DataContext";
import eye from "../assets/eye.svg";
import uvIndex from "../assets/uv-index.svg";
import humidity from "../assets/humidity.svg";
import wind from "../assets/wind.svg";
import sunrise from "../assets/sunrise.svg";
import { ISO8601DateStringToHHMMString } from "../functions";
export default function Highlights() {
  const { data } = useContext(DataContext);

  const sunriseDateString = data.daily.sunrise[0];
  const sunriseHHMM = ISO8601DateStringToHHMMString(sunriseDateString);
  const sunsetDateString = data.daily.sunset[0];
  const sunsetHHMM = ISO8601DateStringToHHMMString(sunsetDateString);
  return (
    <section className="highlights">
      <h2>Destacado</h2>
      <div className="cards-container">
        <WeatherCard title={"Indice UV "}>
          <p>{data.daily.uv_index_max}</p> <img src={uvIndex} alt="" />
        </WeatherCard>

        <WeatherCard title={"Estado del viento"}>
          <p>
            {data.current.windspeed_10m}
            {data.current_units.windspeed_10m}
          </p>
          <img src={wind} alt="" />
        </WeatherCard>
        <WeatherCard
          className={"sunrise-sunset"}
          title={"Amanecer y salida del sol"}
        >
          <div className="subcontainer">
            <p className="sunrise">{sunriseHHMM}</p>
            <img src={sunrise} alt="" />
          </div>
          <div className="subcontainer">
            <p className="sunset">{sunsetHHMM}</p> <img src={sunset} alt="" />
          </div>
        </WeatherCard>
        <WeatherCard title={"Humedad"}>
          <p>
            {data.hourly.relativehumidity_2m[0]}
            {data.hourly_units.relativehumidity_2m}
          </p>
          <img src={humidity} alt="" />
        </WeatherCard>
        <WeatherCard title="Visibilidad">
          <p>
            {data.hourly.visibility[0]} {data.hourly_units.visibility}
          </p>
          <img src={eye} alt="" />
        </WeatherCard>
        <WeatherCard title="Calidad del aire"></WeatherCard>
      </div>
    </section>
  );
}
