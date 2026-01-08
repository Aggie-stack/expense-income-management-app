import { Link } from 'react-router-dom'
import { useAuth } from '../services/auth'

export default function Navbar() {
  const { token, logout } = useAuth()

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* LEFT */}
        <div className="navbar-left">
          <Link to="/" className="navbar-title"><h1><b>FinanceTracker</b></h1></Link>

          {token && (
            <nav className="navbar-links">
              <Link to="/transactions">Transactions</Link>
              <Link to="/add">Add</Link>
            </nav>
          )}
        </div>

        {/* RIGHT */}
        <div className="navbar-right">
          {token ? (
            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          ) : (
            <div className="auth-links">
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          )}
        </div>

      </div>
    </header>
  )
}
