
export default function Toggle({ checked = false, onChange = () => {}, disabled = false, label }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => !disabled && onChange(!checked)}
        className={`relative h-[22px] w-[42px] rounded-full transition-colors duration-200 ${checked ? 'bg-[var(--primary)]' : 'bg-[var(--border-strong)]'} ${disabled ? 'opacity-40 pointer-events-none' : ''}`}
      >
        <span className={`absolute left-[2px] top-[2px] h-[18px] w-[18px] transform rounded-full bg-white shadow-sm transition-transform duration-200 ${checked ? 'translate-x-[20px]' : 'translate-x-0'}`} />
      </button>
      {label && <span className="text-sm text-[var(--text-secondary)]">{label}</span>}
    </label>
  )
}
