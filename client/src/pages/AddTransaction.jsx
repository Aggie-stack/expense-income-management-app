import { useState } from 'react'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'

export default function AddTransaction() {
    const [amount, setAmount] = useState('')
    const [type, setType] = useState('expense')
    const [category, setCategory] = useState('General')
    const [date, setDate] = useState(new Date().toISOString().slice(0,10))
    const [description, setDescription] = useState('')
    const navigate = useNavigate()

    const submit = async (e) => {
        e.preventDefault()
        await api.post('/transactions', { amount, type, category, date, description })
        navigate('/transactions')
    }

    return (
        <div>
            <h2>Add Transaction</h2>
            <form onSubmit={submit}>
                <input className="input" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
                <br></br> <br></br>
                <select className="input" value={type} onChange={e => setType(e.target.value)}>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
                <br></br><br></br>
                <input className="input" placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
                <br></br><br></br>
                <input className="input" type="date" value={date} onChange={e => setDate(e.target.value)} />
                <br></br><br></br>
                <input className="input" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
                <button className="btn-primary">Save</button>
            </form>
        </div>
    )
}