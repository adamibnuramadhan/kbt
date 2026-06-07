import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { t } = useTranslation()

  function handleSubmit(e) {
    e.preventDefault()
    if (password !== 'admin') {
      setError(t('login.invalidCredentials'))
      return
    }
    localStorage.setItem('fg_auth', JSON.stringify({ email }))
    navigate('/dashboard')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg-primary)] px-4 text-[var(--text)]">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--primary)] text-lg font-bold text-white mb-4">F</div>
          <h1 className="font-display text-xl text-[var(--text)]">{t('login.welcomeBack')}</h1>
          <p className="mt-1 text-sm text-[var(--muted)]">{t('login.signInTo')}</p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">{t('login.email')}</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-[var(--radius-button)] border border-[var(--border-strong)] bg-[var(--bg-primary)] px-3 py-2 text-sm text-[var(--text)] placeholder:text-[var(--muted)] focus:border-[var(--primary)]/40 focus:outline-none focus:ring-1 focus:ring-[var(--primary)]/20 transition-colors"
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">{t('login.password')}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-[var(--radius-button)] border border-[var(--border-strong)] bg-[var(--bg-primary)] px-3 py-2 text-sm text-[var(--text)] placeholder:text-[var(--muted)] focus:border-[var(--primary)]/40 focus:outline-none focus:ring-1 focus:ring-[var(--primary)]/20 transition-colors"
                placeholder="••••••••"
              />
            </div>
            {error && <div className="text-xs text-[var(--error)]">{error}</div>}
            <Button type="submit" variant="primary" className="w-full">{t('login.signIn')}</Button>
          </form>
        </Card>

        <p className="mt-6 text-center text-xs text-[var(--muted)]">{t('login.footer')}</p>
      </div>
    </div>
  )
}
