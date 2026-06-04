import { useState } from 'react'
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

  const inputClass = "mt-1.5 w-full rounded-[var(--radius-button)] bg-[var(--bg-primary)] border border-[var(--border-strong)] px-3 py-2 text-[13px] text-[var(--text)] focus:outline-none focus:border-[var(--primary)]/40 focus:ring-1 focus:ring-[var(--primary)]/20 transition-colors"

  return (
    <Card>
      <h3 className="font-display text-lg text-[var(--text)]">Get in Touch</h3>
      <p className="text-sm text-[var(--muted)] mt-1">Submit a ticket and our team will respond promptly.</p>

      <form onSubmit={submit} className="mt-5 space-y-4">
        <div>
          <label className="block text-xs font-medium text-[var(--muted)] uppercase tracking-wider">Inquiry Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)} className={inputClass}>
            <option>Hardware Failure</option>
            <option>Software Bug</option>
            <option>Data Issue</option>
            <option>General</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-[var(--muted)] uppercase tracking-wider">Vehicle / Asset ID</label>
          <input value={asset} onChange={(e) => setAsset(e.target.value)} placeholder="e.g. TRUCK-084" className={inputClass} />
          {errors.asset && <div className="text-[10px] text-[var(--error)] mt-1">{errors.asset}</div>}
        </div>

        <div>
          <label className="block text-xs font-medium text-[var(--muted)] uppercase tracking-wider">Problem Description</label>
          <textarea value={desc} onChange={(e) => setDesc(e.target.value)} rows={4} className={inputClass} />
          {errors.desc && <div className="text-[10px] text-[var(--error)] mt-1">{errors.desc}</div>}
        </div>

        <div className="pt-1">
          <Button type="submit" variant="primary" size="sm">Submit Ticket</Button>
        </div>
      </form>
    </Card>
  )
}
