import Card from './Card'

export default function EmptyState({ title, description, actionLabel, onAction }) {
  return (
    <Card className="border-dashed text-center" noPadding>
      <div className="px-6 py-10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--bg-hover)] text-2xl text-[var(--primary)]">
          ⟂
        </div>
        <h3 className="mt-4 font-display text-xl text-[var(--text)]">{title}</h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-[var(--muted)]">{description}</p>
        {actionLabel && onAction && (
          <button onClick={onAction} className="mt-5 rounded-md bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white">
            {actionLabel}
          </button>
        )}
      </div>
    </Card>
  )
}