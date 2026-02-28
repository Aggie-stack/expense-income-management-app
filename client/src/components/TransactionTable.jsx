import React, { useState } from "react";
import { calculateTotal } from "../utils/calculations";

const TransactionTable = ({ title, data, onDelete, onEdit }) => {
  const total = calculateTotal(data);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  const startEdit = (item) => {
    setEditId(item.id);
    setEditData(item);
  };

  const saveEdit = () => {
    onEdit(editData);
    setEditId(null);
  };

  return (
    <div className="card">
      <div className="card-title">{title}</div>

      <table>
        <thead>
          <tr>
            <th>Source</th>
            <th>Amount</th>
            <th>Tag</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              {editId === item.id ? (
                <>
                  <td>
                    <input
                      value={editData.source}
                      onChange={(e) =>
                        setEditData({ ...editData, source: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={editData.amount}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          amount: Number(e.target.value),
                        })
                      }
                    />
                  </td>
                  <td>
                    <input
                      value={editData.tag}
                      onChange={(e) =>
                        setEditData({ ...editData, tag: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      value={editData.date}
                      onChange={(e) =>
                        setEditData({ ...editData, date: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <button onClick={saveEdit}>Save</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{item.source}</td>
                  <td>${item.amount}</td>
                  <td>{item.tag}</td>
                  <td>{item.date}</td>
                  <td>
                    <button onClick={() => startEdit(item)}>Edit</button>
                    <button onClick={() => onDelete(item.id)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="total">${total.toLocaleString()}</div>
    </div>
  );
};

export default TransactionTable;