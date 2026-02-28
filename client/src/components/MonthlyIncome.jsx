import React from "react";

const MonthlyIncome = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="card">
      <h3>Monthly Income</h3>

      {data.length === 0 ? (
        <p>No income added yet.</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Source</th>
                <th>Amount</th>
                <th>Tag</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.source}</td>
                  <td>${item.amount.toLocaleString()}</td>
                  <td>
                    <span className="tag">{item.tag}</span>
                  </td>
                  <td>{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="total">
            ${total.toLocaleString()}
          </div>
        </>
      )}
    </div>
  );
};

export default MonthlyIncome;