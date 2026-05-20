import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
<<<<<<< HEAD
=======
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
>>>>>>> 58dcdca (kbt full)
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
<<<<<<< HEAD
    if (password !== 'admin') {
      setError('Invalid credentials')
      return
    }
    localStorage.setItem('fg_auth', JSON.stringify({ email }))
    navigate('/dashboard')
=======
    setLoading(true)
    setError('')
    setTimeout(() => {
      if (password !== 'admin123') {
        setError('Kredensial tidak valid. Coba lagi.')
        setLoading(false)
        return
      }
      localStorage.setItem('fg_auth', 'true')
      navigate('/dashboard')
    }, 800)
>>>>>>> 58dcdca (kbt full)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg-primary)] px-4 text-[var(--text)]">
<<<<<<< HEAD
      <Card className="w-full max-w-md">
        <div className="text-center">
=======
      <Card className="w-full max-w-md p-10">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--primary)] text-white">FG</div>
>>>>>>> 58dcdca (kbt full)
          <div className="font-display text-3xl font-bold text-[var(--primary)]">FuelGuard</div>
          <div className="mt-1 text-xs uppercase tracking-[0.3em] text-[var(--muted)]">FUEL MONITORING SYSTEM</div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm text-[var(--muted)]">Email</label>
<<<<<<< HEAD
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-md border border-[var(--border)] bg-[var(--bg-primary)] px-3 py-2 text-sm text-[var(--text)]" />
          </div>
          <div>
            <label className="text-sm text-[var(--muted)]">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full rounded-md border border-[var(--border)] bg-[var(--bg-primary)] px-3 py-2 text-sm text-[var(--text)]" />
          </div>
          {error && <div className="text-sm text-[var(--error)]">{error}</div>}
          <Button type="submit" variant="primary" className="w-full">Login</Button>
        </form>
=======
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="fleet@company.com" className="mt-1 w-full rounded-md border border-[var(--border)] bg-[var(--bg-primary)] px-3 py-2 text-sm text-[var(--text)]" />
          </div>
          <div>
            <label className="text-sm text-[var(--muted)]">Password</label>
            <div className="relative mt-1">
              <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full rounded-md border border-[var(--border)] bg-[var(--bg-primary)] px-3 py-2 pr-16 text-sm text-[var(--text)]" />
              <button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-[var(--muted)] hover:text-white">
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <div className="mt-1 text-xs text-[var(--muted)]">Demo: gunakan password 'admin123'</div>
          </div>
          {error && <div className="text-sm text-[var(--error)]">{error}</div>}
          <Button type="submit" variant="primary" className="w-full" loading={loading}>Masuk ke Dashboard</Button>
        </form>

        <div className="mt-8 text-center text-xs text-[var(--muted)]">© 2026 FuelGuard Systems</div>
>>>>>>> 58dcdca (kbt full)
      </Card>
    </div>
  )
}
