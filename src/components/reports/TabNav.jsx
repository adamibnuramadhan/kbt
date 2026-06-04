export default function TabNav({ tabs = [], active, onChange }) {
  return (
    <div className="flex items-center gap-4 border-b border-[var(--border)] px-2 pb-2">
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className={`px-3 py-2 text-sm ${active === t ? 'text-[var(--primary)] border-b-2 border-[var(--primary)]' : 'text-[var(--muted)] hover:text-white'}`}
        >
          {t}
        </button>
      ))}
    </div>
  )
}

