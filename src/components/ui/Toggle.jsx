import React from 'react'

export default function Toggle({ checked = false, onChange = () => {}, disabled = false, label }) {
  return (
    <label className="flex items-center gap-3">
      {label && <span className="text-sm text-[var(--text-secondary)]">{label}</span>}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => !disabled && onChange(!checked)}
        className={`relative h-6 w-12 rounded-full transition-colors ${checked ? 'bg-[var(--primary)]' : 'bg-[var(--border)]'} ${disabled ? 'opacity-60 pointer-events-none' : ''}`}
      >
        <span className={`absolute left-0 top-0 h-6 w-6 transform rounded-full bg-white transition-transform ${checked ? 'translate-x-6' : 'translate-x-0'}`} />
      </button>
    </label>
  )
}
