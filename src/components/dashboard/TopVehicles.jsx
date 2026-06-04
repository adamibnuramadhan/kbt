import Card from '../ui/Card'
import { topVehicles } from '../../data/mockData'

export default function TopVehicles() {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <div className="text-[11px] font-medium uppercase tracking-wider text-[var(--muted)]">Top Efficient Vehicles</div>
        <div className="text-[10px] text-[var(--muted)]">This week</div>
      </div>

      <div className="mt-5 space-y-5">
        {topVehicles.map((v, i) => (
          <div key={v.name}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[var(--bg-elevated)] text-[10px] font-medium text-[var(--muted)]">{i + 1}</span>
                <div>
                  <div className="text-[13px] font-medium text-[var(--text)]">{v.name}</div>
                  <div className="text-[10px] text-[var(--muted)]">{v.model}</div>
                </div>
              </div>
              <div className="font-mono text-[13px] text-[var(--text)]">{v.efficiency} <span className="text-[var(--muted)]">km/l</span></div>
            </div>
            <div className="mt-2 h-1 w-full rounded-full bg-[var(--bg-elevated)] overflow-hidden">
              <div
                style={{ width: `${(v.efficiency / v.maxEfficiency) * 100}%` }}
                className="h-1 rounded-full bg-[var(--primary)] transition-all duration-500"
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
