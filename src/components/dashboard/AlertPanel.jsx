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

  const severityDot = {
    critical: 'bg-[var(--error)]',
    warning: 'bg-[var(--warning)]',
    info: 'bg-[var(--info)]',
  }

  return (
    <Card>
      <div className="flex items-center justify-between">
        <div className="text-[11px] font-medium uppercase tracking-wider text-[var(--muted)]">Recent Alerts</div>
        <Badge variant="error" size="sm">{alerts.filter(a => a.severity === 'critical').length} critical</Badge>
      </div>

      <div className="mt-5 space-y-1">
        {items.map((a) => (
          <div key={a.id} onClick={() => navigate('/fleet')} className="flex cursor-pointer items-start gap-3 rounded-lg p-2.5 hover:bg-[var(--bg-hover)] transition-colors">
            <div className={`mt-1.5 h-2 w-2 rounded-full shrink-0 ${severityDot[a.severity] || severityDot.info}`} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <div className="text-[13px] font-medium text-[var(--text)]">{a.title}</div>
                <div className="text-[10px] text-[var(--muted)] shrink-0">{a.timestamp}</div>
              </div>
              <div className="mt-0.5 text-xs text-[var(--text-secondary)] leading-relaxed">{a.description}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <button onClick={() => navigate('/operations')} className="text-xs font-medium text-[var(--primary)] hover:text-[var(--primary-light)] transition-colors">View all alerts →</button>
      </div>
    </Card>
  )
}
