import React from 'react'
import api from '../services/api' // your API service

export default function TransactionCard({ tx, refreshTransactions }) {

  // Delete transaction from backend
  const handleDelete = async (id) => {
    try {
      await api.delete(`/transactions/${id}`)
      refreshTransactions() // re-fetch after deletion
    } catch (error) {
      console.error('Failed to delete:', error)
    }
  }

  // Edit transaction from backend (example: open modal or inline update)
  const handleEdit = async () => {
    const updatedTx = {
      ...tx,
      description: prompt('Enter new description', tx.description)
    }

    if (!updatedTx.description) return

    try {
      await api.put(`/transactions/${tx.id}`, updatedTx)
      refreshTransactions() // re-fetch after update
    } catch (error) {
      console.error('Failed to update:', error)
    }
  }

  return (
    <div className="transaction-card">

      {/* LEFT */}
      <div className="transaction-left">
        <div className="transaction-date">{tx.date}</div>
        <div className="transaction-info">
          {tx.category} — {tx.description}
        </div>
      </div>

      {/* RIGHT */}
      <div className="transaction-right">
        <div
          className={`transaction-amount ${
            tx.type === 'expense' ? 'expense' : 'income'
          }`}
        >
          {tx.amount}
        </div>

        <div className="transaction-actions">
          <button className="icon-btn edit-btn" onClick={handleEdit} title="Edit">✏️</button>
          <button className="icon-btn delete-btn" onClick={() => handleDelete(tx.id)} title="Delete">🗑️</button>
        </div>
      </div>

    </div>
  )
}
