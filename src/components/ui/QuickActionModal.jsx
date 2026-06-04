import Modal from './Modal'
import Button from './Button'
import useUIStore from '../../store/useUIStore'
import { useToast } from './Toast'

const ACTIONS = [
  { key: 'vehicle', title: 'Add Vehicle', description: 'Register a new fleet unit and assign a driver.' },
  { key: 'fuel', title: 'Log Fuel Event', description: 'Record fueling manually for a vehicle visit.' },
  { key: 'alert', title: 'Create Alert', description: 'Escalate an issue to operations and support.' },
]

export default function QuickActionModal() {
  const activeModal = useUIStore((state) => state.activeModal)
  const closeModal = useUIStore((state) => state.closeModal)
  const { addToast } = useToast()

  const handleAction = (label) => {
    addToast({ message: `${label} captured in the demo workspace.`, variant: 'success' })
    closeModal()
  }

  return (
    <Modal isOpen={activeModal === 'quick-add'} onClose={closeModal} title="Quick Actions" subtitle="Fast shortcuts for common FuelGuard tasks." size="md">
      <div className="grid gap-3 md:grid-cols-3">
        {ACTIONS.map((action) => (
          <button
            key={action.key}
            onClick={() => handleAction(action.title)}
            className="rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--bg-primary)] p-4 text-left transition hover:border-[var(--border-strong)] hover:bg-[var(--bg-hover)]"
          >
            <div className="text-sm font-semibold text-[var(--text)]">{action.title}</div>
            <div className="mt-2 text-sm text-[var(--muted)]">{action.description}</div>
          </button>
        ))}
      </div>
      <div className="mt-5 flex justify-end">
        <Button variant="ghost" onClick={closeModal}>Dismiss</Button>
      </div>
    </Modal>
  )
}
