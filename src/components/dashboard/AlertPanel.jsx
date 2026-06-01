import Card from '../ui/Card'
import Badge from '../ui/Badge'
import { alerts } from '../../data/mockData'
import { useNavigate } from 'react-router-dom'
import useMaintenanceStore from '../../store/useMaintenanceStore'

export default function AlertPanel() {
  const navigate = useNavigate()
  const maintenanceLogs = useMaintenanceStore((state) => state.maintenanceLogs)
  const upcomingMaintenance = maintenanceLogs.filter((log) => log.status === 'Scheduled').slice(0, 2)

  const items = [
    ...alerts.slice(0, 2),
    ...upcomingMaintenance.map((log) => ({
      id: log.id,
      severity: 'warning',
      title: 'Service Reminder',
      description: `${log.vehicleId} dijadwalkan servis pada ${log.scheduledDate}${log.notes ? ` - ${log.notes}` : ''}`,
      timestamp: 'Maintenance log',
    })),
  ].slice(0, 4)

  return (
    <Card>
      <div className="flex items-center justify-between">
        <div className="text-xs font-semibold uppercase text-[var(--muted)]">RECENT ALERTS</div>
        <Badge variant="error">3 CRITICAL</Badge>
      </div>

      <div className="mt-4 space-y-3">
        {items.map((a) => (
          <div key={a.id} onClick={() => navigate('/fleet')} className="flex cursor-pointer items-start gap-3 rounded-md p-2 hover:bg-[var(--bg-hover)]">
            <div className={`mt-1 h-10 w-10 flex-shrink-0 rounded-md ${a.severity === 'critical' ? 'bg-[var(--error)]/20 text-[var(--error)]' : a.severity === 'warning' ? 'bg-[var(--warning)]/20 text-[var(--warning)]' : 'bg-[var(--info)]/20 text-[var(--info)]'} flex items-center justify-center`}>
              {/* simple icon placeholder */}
              <span className="text-sm">!</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-[var(--text)]">{a.title}</div>
                <div className="text-xs text-[var(--muted)]">{a.timestamp}</div>
              </div>
              <div className="mt-1 text-xs text-[var(--text-secondary)]">{a.description}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-right">
        <button onClick={() => navigate('/operations')} className="text-sm text-[var(--primary)]">VIEW ALL SYSTEM ALERTS →</button>
      </div>
    </Card>
  )
}
