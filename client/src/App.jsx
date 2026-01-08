import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Transactions from './pages/Transactions'
import AddTransaction from './pages/AddTransaction'
import { AuthProvider, useAuth } from './services/auth.jsx'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
 return (
   <AuthProvider>
     <div className="min-h-screen bg-slate-50">
       <Navbar />
       <main className="container mx-auto p-4">

          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
            <Route path="/add" element={<ProtectedRoute><AddTransaction /></ProtectedRoute>} />

            <Route path="*" element={<Navigate to="/" replace />} />
         </Routes>
       </main>
     </div>
   </AuthProvider>
  )
}