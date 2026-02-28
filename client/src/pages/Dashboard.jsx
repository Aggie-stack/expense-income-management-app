import React, { useState, useEffect } from "react";
import SavingsChart from "../components/SavingsChart";
import NotesCard from "../components/NotesCard";
import TransactionTable from "../components/TransactionTable";
import AddTransactionForm from "../components/AddTransactionForm";
import { calculateTotal } from "../utils/calculations";

const Dashboard = () => {
  // ✅ Default to current month automatically
  const currentMonth = new Date().toISOString().slice(0, 7);

  // ✅ Load from localStorage safely
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  // ✅ Persist automatically
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  // ✅ Add
  const handleAdd = (transaction) => {
    setTransactions((prev) => [...prev, transaction]);
  };

  // ✅ Delete
  const handleDelete = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  // ✅ Edit
  const handleEdit = (updated) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t))
    );
  };

  // ✅ Filter by selected month
  const filtered = transactions.filter(
    (t) =>
      t.date &&
      typeof t.date === "string" &&
      t.date.startsWith(selectedMonth)
  );

  // ✅ Auto-route by type
  const income = filtered.filter((t) => t.type === "income");
  const expenses = filtered.filter((t) => t.type === "expense");

  // ✅ Totals
  const totalIncome = calculateTotal(income);
  const totalExpenses = calculateTotal(expenses);

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

      <AddTransactionForm onAdd={handleAdd} />

      <div className="content">
        <div className="left-panel">
          <SavingsChart income={totalIncome} expenses={totalExpenses} />
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