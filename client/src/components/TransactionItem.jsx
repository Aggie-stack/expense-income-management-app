import React from 'react'
import api from '../services/api' // your API service

export default function TransactionItem({ tx, refreshTransactions }) {

  const handleDelete = async (id) => {
    try {
      await api.delete(`/transactions/${id}`)
      refreshTransactions()
    } catch (error) {
      console.error('Failed to delete:', error)
    }
  }

  const handleEdit = async () => {
    const updatedTx = {
      ...tx,
      description: prompt('Enter new description', tx.description)
    }

    if (!updatedTx.description) return

    try {
      await api.put(`/transactions/${tx.id}`, updatedTx)
      refreshTransactions()
    } catch (error) {
      console.error('Failed to update:', error)
    }
  }

  return (
    <div className="transaction-item">

      <div className="transaction-main">
        <span className="transaction-category">{tx.category}</span>
        <span
          className={`transaction-amount ${
            tx.type === 'expense' ? 'expense' : 'income'
          }`}
        >
          {tx.amount}
        </span>
        <span className="transaction-date">({tx.date})</span>
      </div>

      <div className="transaction-description">
        {tx.description}
      </div>

      <div className="transaction-actions">
        <button className="icon-btn edit-btn" onClick={handleEdit} title="Edit">✏️</button>
        <button className="icon-btn delete-btn" onClick={() => handleDelete(tx.id)} title="Delete">🗑️</button>
      </div>

    </div>
  )
}
