import { useEffect, useState } from 'react'
import api from '../services/api'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement
} from 'chart.js'
import { Pie, Bar, Line } from 'react-chartjs-2'

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement
)

export default function Dashboard() {
  const [summary, setSummary] = useState({ income: 0, expense: 0 })
  const [byCategory, setByCategory] = useState([])

  useEffect(() => {
    const year = new Date().getFullYear()
    const month = new Date().getMonth() + 1

    // Monthly summary
    api.get(`/summary/month/${year}/${month}`)
      .then(res => {
        setSummary({
          income: res.data.income,
          expense: res.data.expense
        })
      })

    // Category expenses
    api.get('/transactions')
      .then(res => {
        const map = {}

        res.data.forEach(t => {
          if (t.type === 'expense') {
            map[t.category] =
              (map[t.category] || 0) + parseFloat(t.amount)
          }
        })

        setByCategory(
          Object.entries(map).map(([category, amount]) => ({
            category,
            amount
          }))
        )
      })
  }, [])

  /* ---------------- CHART DATA ---------------- */

  const pieData = {
    labels: byCategory.map(b => b.category),
    datasets: [
      {
        data: byCategory.map(b => b.amount)
      }
    ]
  }

  const barData = {
    labels: byCategory.map(b => b.category),
    datasets: [
      {
        label: 'Expenses',
        data: byCategory.map(b => b.amount)
      }
    ]
  }

  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Expense Trend',
        data: [1200, 900, 1400, 1100, 1600, 1300],
        tension: 0.4
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false
  }

  return (
    <div>
      <h2>Dashboard</h2><br></br>

      {/* SUMMARY CARDS */}
      <div>
        <div>
          <div>Income this month = {summary.income}</div>
        </div><br></br>

        <div>
          <div>Expense this month = {summary.expense}</div>
        </div> <br></br>

        <div>
          <div>Budget = Coming soon</div>
        </div>
      </div><br></br>

      {/* CHARTS IN ONE ROW */}
      <div>
        <h2>Spending by Category</h2>

        <div>

          <div>
            {byCategory.length ? (
              <Pie data={pieData} options={chartOptions} />
            ) : (
              <p>No data</p>
            )}
          </div>

          <div>
            {byCategory.length ? (
              <Bar data={barData} options={chartOptions} />
            ) : (
              <p>No data</p>
            )}
          </div>

          <div>
            <Line data={lineData} options={chartOptions} />
          </div>

        </div>
      </div>
    </div>
  )
}
