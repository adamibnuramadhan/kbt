import { useState } from 'react'
import Button from '../ui/Button'
import { useToast } from '../ui/Toast'

export default function ProfileForm({ initial = {} }) {
  const [fullName, setFullName] = useState(initial.fullName || 'Alex Carter')
  const [email] = useState(initial.email || 'alex.carter@fuelguard.io')
  const [company, setCompany] = useState(initial.company || 'FG-CENTRAL-LOGISTICS-NORTH')
  const { addToast } = useToast()

  function save() {
    addToast({ message: 'Profile saved', variant: 'success' })
  }

  const inputClass = "mt-1.5 w-full rounded-[var(--radius-button)] bg-[var(--bg-primary)] border border-[var(--border-strong)] px-3 py-2 text-[13px] text-[var(--text)] focus:outline-none focus:border-[var(--primary)]/40 focus:ring-1 focus:ring-[var(--primary)]/20 transition-colors"

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-xs font-medium text-[var(--muted)] uppercase tracking-wider">Full Name</label>
        <input value={fullName} onChange={(e) => setFullName(e.target.value)} className={inputClass} />
      </div>

      <div>
        <label className="block text-xs font-medium text-[var(--muted)] uppercase tracking-wider">Email Address</label>
        <input value={email} readOnly className={`${inputClass} opacity-60 cursor-not-allowed`} />
      </div>

      <div>
        <label className="block text-xs font-medium text-[var(--muted)] uppercase tracking-wider">Company Identifier</label>
        <input value={company} onChange={(e) => setCompany(e.target.value)} className={inputClass} />
      </div>

      <div className="flex justify-end pt-2">
        <Button onClick={save} variant="primary" size="sm">Save Changes</Button>
      </div>
    </div>
  )
}
