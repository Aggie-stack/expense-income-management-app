import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../services/auth.jsx"; // AuthProvider hook

const API_URL = "http://127.0.0.1:5000";

export default function Transactions() {
  const { token } = useAuth();

  const [transactions, setTransactions] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    amount: "",
    type: "income",
    category: "",
    date: "",
    description: "",
  });

  const authConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // Fetch all transactions
  const fetchTransactions = async () => {
    if (!token) return;
    try {
      const res = await axios.get(`${API_URL}/api/transactions`, authConfig);
      setTransactions(res.data);
    } catch (err) {
      console.error("Fetch error:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [token]);

  // Add transaction
  const addTransaction = async () => {
    try {
      const res = await axios.post(`${API_URL}/api/transactions`, form, authConfig);
      setTransactions([...transactions, { ...form, id: res.data.transaction_id }]);
      setForm({ amount: "", type: "income", category: "", date: "", description: "" });
    } catch (err) {
      console.error("Add error:", err.response?.data || err.message);
    }
  };

  // Start editing
  const startEdit = (tx) => {
    setEditingId(tx.id);
    setForm({
      amount: tx.amount,
      type: tx.type,
      category: tx.category,
      date: tx.date.split("T")[0],
      description: tx.description || "",
    });
  };

  // Update transaction
  const updateTransaction = async () => {
    try {
      await axios.put(`${API_URL}/api/transactions/${editingId}`, form, authConfig);
      setTransactions(
        transactions.map((t) => (t.id === editingId ? { ...t, ...form } : t))
      );
      setEditingId(null);
      setForm({ amount: "", type: "income", category: "", date: "", description: "" });
    } catch (err) {
      console.error("Update error:", err.response?.data || err.message);
    }
  };

  // Delete transaction
  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/transactions/${id}`, authConfig);
      setTransactions(transactions.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Delete error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="transactions-page">
      <h1>Transactions</h1>

      {/* Add / Edit Form */}
      <div className="transaction-form">
        <h2>{editingId ? `Edit Transaction #${editingId}` : "Add New Transaction"}</h2>
        <div className="form-grid">
          <input
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: parseFloat(e.target.value) })}
          />
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <input
            type="text"
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        <div className="form-buttons">
          {editingId ? (
            <>
              <button className="btn save" onClick={updateTransaction}>
                Save
              </button>
              <button
                className="btn cancel"
                onClick={() => {
                  setEditingId(null);
                  setForm({ amount: "", type: "income", category: "", date: "", description: "" });
                }}
              >
                Cancel
              </button>
            </>
          ) : (
            <button className="btn add" onClick={addTransaction}>
              Add
            </button>
          )}
        </div>
      </div>

      {/* Transactions Table */}
      <table className="transactions-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Category</th>
            <th>Date</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.amount}</td>
              <td>{t.type}</td>
              <td>{t.category}</td>
              <td>{t.date.split("T")[0]}</td>
              <td>{t.description}</td>
              <td>
                <button className="btn edit" onClick={() => startEdit(t)}>Edit</button>
                <button className="btn delete" onClick={() => deleteTransaction(t.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
