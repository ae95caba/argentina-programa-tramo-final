// components/BarChart.js
import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function BarChart({ chartData }) {
  return (
    <section className="barchart-container">
      <Bar data={chartData} />
    </section>
  );
}

export { BarChart };
