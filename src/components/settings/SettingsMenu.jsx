//

export default function SettingsMenu({ items = [], active, onSelect }) {
  return (
    <div className="space-y-1">
      {items.map((it) => (
        <button
          key={it.key}
          onClick={() => onSelect(it.key)}
          className={`w-full text-left px-3 py-2 rounded-md ${active === it.key ? 'bg-[var(--primary)] text-white' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]'}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-[var(--muted)]">{it.icon}</span>
              <span>{it.label}</span>
            </div>
            {it.badge ? <span className="text-xs font-medium text-[var(--error)]">{it.badge}</span> : null}
          </div>
        </button>
      ))}
    </div>
  )
}

