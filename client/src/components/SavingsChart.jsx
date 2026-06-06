import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const SavingsChart = ({ income, expenses, savings }) => {
  const fmt = (v) =>
    "$" + Math.abs(v).toLocaleString(undefined, { maximumFractionDigits: 0 });

  const data = {
    labels: ["Income", "Expenses", "Savings"],
    datasets: [
      {
        label: "Amount",
        data: [income, expenses, Math.max(0, savings)],
        backgroundColor: ["#059669", "#dc2626", "#2563eb"],
        borderRadius: 10,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: { label: (ctx) => " " + fmt(ctx.raw) },
        backgroundColor: "#0f172a",
        titleColor: "#94a3b8",
        bodyColor: "#fff",
        padding: 10,
        cornerRadius: 8,
      },
    },
    scales: {
      y: {
        ticks: {
          callback: (v) => fmt(v),
          font: { size: 11, family: "'DM Mono', monospace" },
          color: "#94a3b8",
        },
        grid: { color: "rgba(255,255,255,0.06)" },
        border: { display: false },
      },
      x: {
        ticks: {
          font: { size: 12, family: "'Plus Jakarta Sans', sans-serif", weight: "500" },
          color: "#94a3b8",
        },
        grid: { display: false },
        border: { display: false },
      },
    },
  };

  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <span className="chart-card-title">Overview</span>
        <div className="chart-legend">
          <span className="chart-legend-dot" style={{ background: "#059669" }} />Income
          <span className="chart-legend-dot" style={{ background: "#dc2626" }} />Expenses
          <span className="chart-legend-dot" style={{ background: "#2563eb" }} />Savings
        </div>
      </div>
      <div className="chart-wrap">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default SavingsChart;