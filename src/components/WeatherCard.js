import React from "react";

export default function WeatherCard({ title, children, className }) {
  return (
    <div className={`weather-card ${className}`}>
      <h4>{title}</h4>
      <div className="container">{children}</div>
    </div>
  );
}
