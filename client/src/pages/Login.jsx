import { useState } from 'react'
import { useAuth } from '../services/auth'
import { useNavigate, useLocation } from 'react-router-dom'

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const auth = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const from = location.state?.from?.pathname || '/'

    const submit = async (e) => {
        e.preventDefault()
        try {
            await auth.login(username, password)
            navigate(from, { replace: true })
        } catch (err) {
            setError('Login failed — check credentials')
        }
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={submit} >
                <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" className="input" /><br></br><br></br>
                <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" className="input" />
                <button>Login</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    )
}