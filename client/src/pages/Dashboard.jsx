import React, { useState, useEffect } from "react";
import SavingsChart from "../components/SavingsChart";
import NotesCard from "../components/NotesCard";
import TransactionTable from "../components/TransactionTable";
import AddTransactionForm from "../components/AddTransactionForm";
import { calculateTotal } from "../utils/calculations";

const Dashboard = () => {
  const currentMonth = new Date().toISOString().slice(0, 7);

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const handleAdd = (transaction) => {
    setTransactions((prev) => [...prev, transaction]);
  };

  const handleDelete = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const handleEdit = (updated) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t))
    );
  };

  const filtered = transactions.filter(
    (t) => t.date && typeof t.date === "string" && t.date.startsWith(selectedMonth)
  );

  const income = filtered.filter((t) => t.type === "income");
  const expenses = filtered.filter((t) => t.type === "expense");

  const totalIncome = calculateTotal(income);
  const totalExpenses = calculateTotal(expenses);
  const savings = totalIncome - totalExpenses;

  return (
    <div className="container">
      <header className="header">
        <h1>Personal Finance Tracker</h1>
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        />
      </header>

      {/* Summary bar */}
      <div className="summary-bar">
        <div className="summary-card income-card">
          <span className="summary-label">Income</span>
          <span className="summary-value">${totalIncome.toLocaleString()}</span>
        </div>
        <div className="summary-card expense-card">
          <span className="summary-label">Expenses</span>
          <span className="summary-value">${totalExpenses.toLocaleString()}</span>
        </div>
        <div className={`summary-card savings-card ${savings < 0 ? "negative" : ""}`}>
          <span className="summary-label">Savings</span>
          <span className="summary-value">
            {savings < 0 ? "-" : ""}${Math.abs(savings).toLocaleString()}
          </span>
        </div>
      </div>

      <AddTransactionForm onAdd={handleAdd} />

      <div className="content">
        <div className="left-panel">
          <SavingsChart income={totalIncome} expenses={totalExpenses} savings={savings} />
          <NotesCard />
        </div>

        <div className="right-panel">
          <TransactionTable
            title="Monthly Income"
            data={income}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
          <TransactionTable
            title="Monthly Expenses"
            data={expenses}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;