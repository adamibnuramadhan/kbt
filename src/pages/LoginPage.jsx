import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import AnimatedTruck from '../components/3d/AnimatedTruck'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
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
    <div className="flex min-h-screen bg-[var(--bg-primary)] text-[var(--text)]">
      {/* 3D Animated Section - Hidden on mobile, visible on lg screens */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <AnimatedTruck />
      </div>

      {/* Form Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--primary)] text-lg font-bold text-white mb-4">F</div>
          <h1 className="font-display text-xl text-[var(--text)]">{t('login.welcomeBack')}</h1>
          <p className="mt-1 text-sm text-[var(--muted)]">{t('login.signInTo')}</p>
        </div>

        <div className="lg:hidden w-1/2 mx-auto h-48 relative mb-8 rounded-[var(--radius-card)] overflow-hidden">
          <AnimatedTruck />
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
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-[var(--radius-button)] border border-[var(--border-strong)] bg-[var(--bg-primary)] px-3 py-2 pr-10 text-sm text-[var(--text)] placeholder:text-[var(--muted)] focus:border-[var(--primary)]/40 focus:outline-none focus:ring-1 focus:ring-[var(--primary)]/20 transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-[var(--muted)] hover:text-[var(--text)] transition-colors"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                  )}
                </button>
              </div>
            </div>
            {error && <div className="text-xs text-[var(--error)]">{error}</div>}
            <Button type="submit" variant="primary" className="w-full">{t('login.signIn')}</Button>
          </form>
        </Card>

        <p className="mt-6 text-center text-xs text-[var(--muted)]">{t('login.footer')}</p>
        </div>
      </div>
    </div>
  )
}
