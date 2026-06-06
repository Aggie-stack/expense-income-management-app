import React, { useState, useEffect } from "react";
import SavingsChart from "../components/SavingsChart";
import NotesCard from "../components/NotesCard";
import TransactionTable from "../components/TransactionTable";
import AddTransactionForm from "../components/AddTransactionForm";
import { calculateTotal } from "../utils/calculations";

const STORAGE_KEY = "finance_transactions_v1";
const MONTH_KEY   = "finance_selected_month";

// Returns "YYYY-MM" using LOCAL time (not UTC)
const getLocalMonth = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
};

const Dashboard = () => {
  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const parsed = saved ? JSON.parse(saved) : [];
      console.log("[Finance] Loaded from localStorage:", parsed);
      return parsed;
    } catch (e) {
      console.error("[Finance] localStorage load error:", e);
      return [];
    }
  });

  // Persist selectedMonth so it survives page refresh
  const [selectedMonth, setSelectedMonth] = useState(() => {
    return localStorage.getItem(MONTH_KEY) || getLocalMonth();
  });

  // Save transactions whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
      console.log("[Finance] Saved to localStorage. Total:", transactions.length);
    } catch (e) {
      console.error("[Finance] localStorage save error:", e);
    }
  }, [transactions]);

  // Save selectedMonth whenever it changes
  useEffect(() => {
    localStorage.setItem(MONTH_KEY, selectedMonth);
    console.log("[Finance] Saved selectedMonth:", selectedMonth);
  }, [selectedMonth]);

  const handleAdd = (transaction) => {
    console.log("[Finance] handleAdd called with:", transaction);

    // Auto-switch the month picker to match the transaction's date
    const txMonth = transaction.date.slice(0, 7);
    console.log("[Finance] Auto-switching selectedMonth to:", txMonth);
    setSelectedMonth(txMonth);

    setTransactions((prev) => {
      const next = [...prev, transaction];
      console.log("[Finance] New transactions array length:", next.length);
      return next;
    });
  };

  const handleDelete = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const handleEdit = (updated) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t))
    );
  };

  const filtered = transactions.filter((t) => {
    if (!t.date || typeof t.date !== "string") return false;
    return t.date.startsWith(selectedMonth);
  });

  console.log("[Finance] Rendering. transactions:", transactions.length, "filtered:", filtered.length, "month:", selectedMonth);

  const income   = filtered.filter((t) => t.type === "income");
  const expenses = filtered.filter((t) => t.type === "expense");

  const totalIncome   = calculateTotal(income);
  const totalExpenses = calculateTotal(expenses);
  const savings       = totalIncome - totalExpenses;

  const fmt = (n) =>
    "$" + Math.abs(n).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 });

  return (
    <div className="page">
      <header className="app-header">
        <div className="app-header-left">
          <div className="app-logo">💰</div>
          <div>
            <h1 className="app-title">Finance Tracker</h1>
            <p className="app-subtitle">Track income, expenses &amp; savings</p>
          </div>
        </div>
        <div className="app-header-right">
          <label className="month-label">Month</label>
          <input
            type="month"
            className="month-picker"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          />
        </div>
      </header>

      <div className="summary-bar">
        <div className="summary-card income-card">
          <div className="summary-icon">↑</div>
          <div>
            <div className="summary-label">Total Income</div>
            <div className="summary-value">{fmt(totalIncome)}</div>
          </div>
        </div>
        <div className="summary-card expense-card">
          <div className="summary-icon">↓</div>
          <div>
            <div className="summary-label">Total Expenses</div>
            <div className="summary-value">{fmt(totalExpenses)}</div>
          </div>
        </div>
        <div className={`summary-card ${savings < 0 ? "negative-card" : "savings-card"}`}>
          <div className="summary-icon">🏦</div>
          <div>
            <div className="summary-label">Net Savings</div>
            <div className="summary-value">{savings < 0 ? "−" : ""}{fmt(savings)}</div>
          </div>
        </div>
        <div className="summary-card count-card">
          <div className="summary-icon">📋</div>
          <div>
            <div className="summary-label">Transactions</div>
            <div className="summary-value">{filtered.length}</div>
          </div>
        </div>
      </div>

      <AddTransactionForm onAdd={handleAdd} />

      <div className="content-grid">
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
            type="income"
          />
          <TransactionTable
            title="Monthly Expenses"
            data={expenses}
            onDelete={handleDelete}
            onEdit={handleEdit}
            type="expense"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;