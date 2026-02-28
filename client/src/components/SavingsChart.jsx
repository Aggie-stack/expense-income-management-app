import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const SavingsChart = ({ income, expenses }) => {
  const savings = income - expenses;

  const data = {
    labels: ["Income", "Expenses", "Savings"],
    datasets: [
      {
        label: "Monthly Overview",
        data: [income, expenses, savings],
        borderColor: "#4ade80",
        backgroundColor: "#4ade80",
      },
    ],
  };

  return (
    <div className="card dark-card">
      <h3>Savings </h3>
      <Line data={data} />
    </div>
  );
};

export default SavingsChart;