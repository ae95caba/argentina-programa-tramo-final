import React, { useContext } from "react";
import DataContext from "../contexts/DataContext";
import { ISO8601DateStringToHHMMString } from "../functions";
export default function CurrentTemp() {
  const { data } = useContext(DataContext);

  const currentTimeString = data.current.time;
  const currentHHMM = ISO8601DateStringToHHMMString(currentTimeString);

  const date = new Date(currentTimeString);

  const daysOfWeek = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
  ];
  const dayOfWeek = daysOfWeek[date.getDay()];
  return (
    <section className="current-temp">
      <p>
        {data.current.temperature_2m}
        <span>{data.hourly_units.temperature_2m}</span>
      </p>
      <p>
        {dayOfWeek}, {currentHHMM}
      </p>
    </section>
  );
}
