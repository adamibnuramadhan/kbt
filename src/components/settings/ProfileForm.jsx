import React, { useState } from 'react'
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

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm text-[var(--muted)]">Full Name</label>
        <input value={fullName} onChange={(e) => setFullName(e.target.value)} className="mt-1 w-full rounded bg-[var(--bg)] border border-[var(--border)] px-3 py-2 text-sm text-[var(--text)]" />
      </div>

      <div>
        <label className="text-sm text-[var(--muted)]">Email Address</label>
        <input value={email} readOnly className="mt-1 w-full rounded bg-[var(--bg-card)] border border-[var(--border)] px-3 py-2 text-sm text-[var(--text-secondary)]" />
      </div>

      <div>
        <label className="text-sm text-[var(--muted)]">Company Identifier</label>
        <input value={company} onChange={(e) => setCompany(e.target.value)} className="mt-1 w-full rounded bg-[var(--bg)] border border-[var(--border)] px-3 py-2 text-sm text-[var(--text)]" />
      </div>

      <div className="flex justify-end">
        <Button onClick={save} variant="primary">Save Profile Changes</Button>
      </div>
    </div>
  )
}

