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
  const data = {
    labels: ["Income", "Expenses", "Savings"],
    datasets: [
      {
        label: "Amount ($)",
        data: [income, expenses, Math.max(0, savings)],
        backgroundColor: ["#1d9e75", "#d85a30", "#378add"],
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => `$${ctx.raw.toLocaleString()}`,
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: (v) => `$${v.toLocaleString()}`,
        },
      },
    },
  };

  return (
    <div className="card dark-card">
      <div className="card-title">Overview</div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default SavingsChart;