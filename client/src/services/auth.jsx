import { createContext, useContext, useState } from 'react'
import axios from 'axios'

const AuthContext = createContext(null)

export function getToken() {
    return localStorage.getItem('token')
}

export function setToken(token) {
    if (token) localStorage.setItem('token', token)
        else localStorage.removeItem('token')
}

export function AuthProvider({ children }) {
    const [token, setTokenState] = useState(getToken())

    const login = async (username, password) => {
        const res = await axios.post('/auth/login', { username, password })
        const t = res.data.token
        setToken(t)
        setTokenState(t)
    }

    const register = async (username, password) => {
        const res = await axios.post('/auth/register', { username, password })
        return res.data
    }

    const logout = () => {
        setToken(null)
        setTokenState(null)
    }

    return (
        <AuthContext.Provider value={{ token, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}
        
