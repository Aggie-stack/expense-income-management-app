import React, { useState } from "react";

const AddTransactionForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    type: "income",
    source: "",
    amount: "",
    tag: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.source || !form.amount || !form.date) return;

    const newTransaction = {
      id: Date.now(),
      source: form.source.trim(),
      amount: Number(form.amount),
      tag: form.tag.trim(),
      date: form.date,
      type: form.type === "expense" ? "expense" : "income", // enforce only 2 types
    };

    onAdd(newTransaction);

    setForm({
      type: "income",
      source: "",
      amount: "",
      tag: "",
      date: "",
    });
  };

  return (
    <div className="card">
        <div className="card-title">Add Transaction</div>

      <form onSubmit={handleSubmit} className="form-grid">
        <select name="type" value={form.type} onChange={handleChange}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <input
          name="source"
          placeholder="Source"
          value={form.source}
          onChange={handleChange}
        />

        <input
          name="amount"
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
        />

        <input
          name="tag"
          placeholder="Tag"
          value={form.tag}
          onChange={handleChange}
        />

        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
        />

        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddTransactionForm;