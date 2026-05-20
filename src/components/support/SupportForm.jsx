import React, { useState } from 'react'
import Card from '../ui/Card'
import Button from '../ui/Button'
import { useToast } from '../ui/Toast'

export default function SupportForm() {
  const [type, setType] = useState('Hardware Failure')
  const [asset, setAsset] = useState('')
  const [desc, setDesc] = useState('')
  const [errors, setErrors] = useState({})
  const { addToast } = useToast()

  function validate() {
    const e = {}
    if (!type) e.type = 'Required'
    if (!asset) e.asset = 'Required'
    if (!desc) e.desc = 'Required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function submit(e) {
    e.preventDefault()
    if (!validate()) return
    const ticket = `FG-${Math.floor(1000 + Math.random() * 9000)}`
    addToast({ message: `Ticket ${ticket} submitted. Response within 1.5 hours.`, variant: 'success' })
    setType('Hardware Failure')
    setAsset('')
    setDesc('')
  }

  return (
    <Card>
      <h3 className="font-display text-lg">GET IN TOUCH</h3>
      <p className="text-sm text-[var(--muted)] mt-1">Technical Support — submit a ticket and our team will respond promptly.</p>

      <form onSubmit={submit} className="mt-4 space-y-3">
        <div>
          <label className="text-sm text-[var(--muted)]">Inquiry Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)} className="mt-1 w-full rounded bg-[var(--bg)] border border-[var(--border)] px-3 py-2 text-sm text-[var(--text)]">
            <option>Hardware Failure</option>
            <option>Software Bug</option>
            <option>Data Issue</option>
            <option>General</option>
          </select>
        </div>

        <div>
          <label className="text-sm text-[var(--muted)]">Vehicle / Asset ID</label>
          <input value={asset} onChange={(e) => setAsset(e.target.value)} placeholder="e.g. TRUCK-084" className="mt-1 w-full rounded bg-[var(--bg)] border border-[var(--border)] px-3 py-2 text-sm text-[var(--text)]" />
          {errors.asset && <div className="text-xs text-[var(--error)] mt-1">{errors.asset}</div>}
        </div>

        <div>
          <label className="text-sm text-[var(--muted)]">Problem Description</label>
          <textarea value={desc} onChange={(e) => setDesc(e.target.value)} rows={4} className="mt-1 w-full rounded bg-[var(--bg)] border border-[var(--border)] px-3 py-2 text-sm text-[var(--text)]" />
          {errors.desc && <div className="text-xs text-[var(--error)] mt-1">{errors.desc}</div>}
        </div>

        <div>
          <Button type="submit" variant="primary" size="md">▶ Submit Ticket</Button>
        </div>
      </form>
    </Card>
  )
}

