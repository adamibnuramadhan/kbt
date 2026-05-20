import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    if (password !== 'admin') {
      setError('Invalid credentials')
      return
    }
    localStorage.setItem('fg_auth', JSON.stringify({ email }))
    navigate('/dashboard')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg-primary)] px-4 text-[var(--text)]">
      <Card className="w-full max-w-md">
        <div className="text-center">
          <div className="font-display text-3xl font-bold text-[var(--primary)]">FuelGuard</div>
          <div className="mt-1 text-xs uppercase tracking-[0.3em] text-[var(--muted)]">FUEL MONITORING SYSTEM</div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm text-[var(--muted)]">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-md border border-[var(--border)] bg-[var(--bg-primary)] px-3 py-2 text-sm text-[var(--text)]" />
          </div>
          <div>
            <label className="text-sm text-[var(--muted)]">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full rounded-md border border-[var(--border)] bg-[var(--bg-primary)] px-3 py-2 text-sm text-[var(--text)]" />
          </div>
          {error && <div className="text-sm text-[var(--error)]">{error}</div>}
          <Button type="submit" variant="primary" className="w-full">Login</Button>
        </form>
      </Card>
    </div>
  )
}
