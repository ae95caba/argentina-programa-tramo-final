import React from "react";
import { data } from "../data";
import min from "../assets/min.svg";
import max from "../assets/max.svg";
export default function MinMaxTemp() {
  return (
    <section className="min-max-temp">
      <div className="left">
        <p>
          {data.daily.temperature_2m_max}
          <span>{data.daily_units.temperature_2m_max}</span>
        </p>
        <div className="container">
          <p>MAX</p> <img src={max} alt="" />
        </div>
      </div>
      <div className="right">
        <p>
          {data.daily.temperature_2m_min}
          <span>{data.daily_units.temperature_2m_max}</span>
        </p>
        <div className="container">
          <p>MIN</p> <img src={min} alt="" />
        </div>
      </div>
    </section>
  );
}
