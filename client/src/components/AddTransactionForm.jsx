import React, { useState } from "react";

const getTodayLocal = () => {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm   = String(d.getMonth() + 1).padStart(2, "0");
  const dd   = String(d.getDate()).padStart(2, "0");
  const result = `${yyyy}-${mm}-${dd}`;
  console.log("[Finance] getTodayLocal() =", result);
  return result;
};

const AddTransactionForm = ({ onAdd }) => {
  const today = getTodayLocal();
  console.log("[Finance] AddTransactionForm initializing, today =", today);

  const [form, setForm] = useState({
    type: "income",
    source: "",
    amount: "",
    tag: "",
    date: today,
  });

  console.log("[Finance] form.date is currently:", form.date);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("[Finance] Field changed:", name, "=", value);
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    console.log("[Finance] handleAdd fired. form =", JSON.stringify(form));
    if (!form.source.trim() || !form.amount || !form.date) {
      console.warn("[Finance] Validation failed — missing source, amount, or date");
      return;
    }
    const newTransaction = {
      id: Date.now(),
      source: form.source.trim(),
      amount: Number(form.amount),
      tag: form.tag.trim(),
      date: form.date,
      type: form.type,
    };
    console.log("[Finance] Calling onAdd with:", JSON.stringify(newTransaction));
    onAdd(newTransaction);
    setForm((prev) => ({
      ...prev,
      source: "",
      amount: "",
      tag: "",
      date: getTodayLocal(),
    }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleAdd();
  };

  return (
    <div className="add-form-card">
      <div className="add-form-header">
        <span className="add-form-title">
          <span className="add-form-title-icon">＋</span>
          Add Transaction
        </span>
        <div className="type-toggle">
          <button
            type="button"
            className={`toggle-btn ${form.type === "income" ? "active-income" : ""}`}
            onClick={() => setForm((p) => ({ ...p, type: "income" }))}
          >
            ↑ Income
          </button>
          <button
            type="button"
            className={`toggle-btn ${form.type === "expense" ? "active-expense" : ""}`}
            onClick={() => setForm((p) => ({ ...p, type: "expense" }))}
          >
            ↓ Expense
          </button>
        </div>
      </div>

      <div className="add-form-fields">
        <input
          className="add-form-input"
          name="source"
          placeholder="Source / Description"
          value={form.source}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <input
          className="add-form-input"
          name="amount"
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          min="0"
          step="0.01"
        />
        <input
          className="add-form-input"
          name="tag"
          placeholder="Tag (optional)"
          value={form.tag}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <input
          className="add-form-input"
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
        />
        <button
          type="button"
          className={`add-btn ${form.type === "expense" ? "expense-btn" : ""}`}
          onClick={handleAdd}
        >
          + Add
        </button>
      </div>
    </div>
  );
};

export default AddTransactionForm;