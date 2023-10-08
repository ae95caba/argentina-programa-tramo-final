import React from "react";
import { data } from "../data";
export default function MinMaxTemp() {
  return (
    <section className="min-max-temp">
      <div className="left">
        <p>
          {data.daily.temperature_2m_max}
          <span>{data.daily_units.temperature_2m_max}</span>
        </p>
        <p>
          HIGH <span>ICON</span>
        </p>
      </div>
      <div className="right">
        <p>
          {data.daily.temperature_2m_min}
          <span>{data.daily_units.temperature_2m_max}</span>
        </p>
        <p>
          LOW <span>ICON</span>
        </p>
      </div>
    </section>
  );
}
