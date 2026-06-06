import React, { useState } from "react";
import { calculateTotal } from "../utils/calculations";

const TransactionTable = ({ title, data, onDelete, onEdit, type }) => {
  const total = calculateTotal(data);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  const isIncome = type === "income";

  const startEdit = (item) => {
    setEditId(item.id);
    setEditData({ ...item });
  };

  const saveEdit = () => {
    if (!editData.source || !editData.amount || !editData.date) return;
    onEdit({ ...editData, amount: Number(editData.amount) });
    setEditId(null);
  };

  const cancelEdit = () => setEditId(null);

  const fmt = (n) =>
    "$" + Number(n).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 });

  return (
    <div className="tx-card">
      <div className="tx-card-header">
        <span className={`tx-title-pill ${isIncome ? "income-pill" : "expense-pill"}`}>
          {isIncome ? "↑" : "↓"} {title}
        </span>
        {data.length > 0 && (
          <span className={`tx-total-badge ${isIncome ? "income-badge" : "expense-badge"}`}>
            {fmt(total)}
          </span>
        )}
      </div>

      {data.length === 0 ? (
        <p className="tx-empty">No transactions yet this month.</p>
      ) : (
        <div className="tx-table-wrap">
          <table className="tx-table">
            <thead>
              <tr>
                <th>Source</th>
                <th>Amount</th>
                <th>Tag</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) =>
                editId === item.id ? (
                  <tr key={item.id} className="edit-row">
                    <td>
                      <input
                        className="tx-edit-input"
                        value={editData.source}
                        onChange={(e) => setEditData({ ...editData, source: e.target.value })}
                      />
                    </td>
                    <td>
                      <input
                        className="tx-edit-input"
                        type="number"
                        value={editData.amount}
                        onChange={(e) => setEditData({ ...editData, amount: e.target.value })}
                        style={{ width: "90px" }}
                      />
                    </td>
                    <td>
                      <input
                        className="tx-edit-input"
                        value={editData.tag || ""}
                        onChange={(e) => setEditData({ ...editData, tag: e.target.value })}
                      />
                    </td>
                    <td>
                      <input
                        className="tx-edit-input"
                        type="date"
                        value={editData.date}
                        onChange={(e) => setEditData({ ...editData, date: e.target.value })}
                      />
                    </td>
                    <td className="tx-actions">
                      <button className="action-btn btn-save" type="button" onClick={saveEdit}>Save</button>
                      <button className="action-btn btn-cancel" type="button" onClick={cancelEdit}>Cancel</button>
                    </td>
                  </tr>
                ) : (
                  <tr key={item.id}>
                    <td className="tx-source">{item.source}</td>
                    <td className={`tx-amount ${isIncome ? "income-amt" : "expense-amt"}`}>
                      {fmt(item.amount)}
                    </td>
                    <td>
                      {item.tag && (
                        <span className={`tx-tag ${isIncome ? "income-tag" : "expense-tag"}`}>
                          {item.tag}
                        </span>
                      )}
                    </td>
                    <td className="tx-date">{item.date}</td>
                    <td className="tx-actions">
                      <button className="action-btn btn-edit" type="button" onClick={() => startEdit(item)}>Edit</button>
                      <button className="action-btn btn-delete" type="button" onClick={() => onDelete(item.id)}>Delete</button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionTable;