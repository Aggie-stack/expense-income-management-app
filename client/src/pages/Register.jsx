import { useState } from 'react'
import { useAuth } from '../services/auth'
import { useNavigate } from 'react-router-dom'

export default function Register() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const auth = useAuth()
    const navigate = useNavigate()

    const submit = async (e) => {
        e.preventDefault()
        try {
            await auth.register(username, password)
            setMessage('Account created. Redirecting to login...')
            setTimeout(() => navigate('/login'), 1000)
        } catch (err) {
            setMessage('Registration failed')
        }
    }

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={submit}>
                <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" className="input" /><br></br><br></br>
                <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" className="input" />
                <button>Create account</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    )
}