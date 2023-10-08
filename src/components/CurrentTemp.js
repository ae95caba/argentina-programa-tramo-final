import React from "react";
import { data } from "../data";
import { ISO8601DateStringToHHMMString } from "../functions";
export default function CurrentTemp() {
  const currentTimeString = data.current_weather.time;
  const currentHHMM = ISO8601DateStringToHHMMString(currentTimeString);
  return (
    <section className="current-temp">
      <p>
        {data.current_weather.temperature}
        <span>{data.hourly_units.temperature_2m}</span>
      </p>
      <p>{currentHHMM}</p>
    </section>
  );
}
