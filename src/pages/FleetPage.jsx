import { useMemo, useState } from 'react'
import MainLayout from '../components/layout/MainLayout'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import VehicleTable from '../components/fleet/VehicleTable'
import FleetMap from '../components/fleet/FleetMap'
import SystemHealth from '../components/fleet/SystemHealth'
import VehicleModal from '../components/fleet/VehicleModal'
import { vehicles as allVehicles } from '../data/mockData'

export default function FleetPage() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedVehicle, setSelectedVehicle] = useState(null)

  const filtered = useMemo(() => {
    if (activeFilter === 'all') return allVehicles
    if (activeFilter === 'lowFuel') return allVehicles.filter((v) => v.fuelLevel < 20)
    if (activeFilter === 'moving') return allVehicles.filter((v) => v.status === 'moving')
    if (activeFilter === 'idle') return allVehicles.filter((v) => v.status === 'idle')
    return allVehicles
  }, [activeFilter])

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <p className="text-xs text-[var(--muted)] uppercase tracking-widest">Management Console</p>
          <div className="mt-2 flex items-center justify-between">
            <h1 className="font-display text-2xl">Fleet Inventory</h1>
            <div className="flex items-center gap-3">
              <button className="rounded-md bg-[var(--bg-hover)] px-3 py-2 text-sm text-[var(--text-secondary)]">Export Data</button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {['all', 'lowFuel', 'moving', 'idle'].map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`rounded-full px-4 py-2 text-sm ${activeFilter === f ? 'bg-[var(--primary)] text-white' : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border border-[var(--border)]'}`}>
              {f === 'all' ? 'All' : f === 'lowFuel' ? 'Low Fuel' : f === 'moving' ? 'Moving' : 'Idle'}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="text-sm text-[var(--muted)]">Total Vehicles</div>
            <div className="mt-2 text-2xl font-bold">{allVehicles.length}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-[var(--muted)]">Active Now</div>
            <div className="mt-2 text-2xl font-bold">{allVehicles.filter((v) => v.status === 'moving').length}</div>
          </Card>
          <Card className="p-4 border-[var(--error)]">
            <div className="text-sm text-[var(--muted)]">Low Fuel Alerts</div>
            <div className="mt-2 text-2xl font-bold text-[var(--error)]">{allVehicles.filter((v) => v.fuelLevel < 20).length}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-[var(--muted)]">Avg Efficiency</div>
            <div className="mt-2 text-2xl font-bold">{(allVehicles.reduce((s, v) => s + v.efficiency, 0) / allVehicles.length).toFixed(1)} km/L</div>
          </Card>
        </div>

        <VehicleTable vehicles={filtered} onRowClick={(v) => setSelectedVehicle(v)} />

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2"><FleetMap vehicles={filtered.slice(0, 8)} /></div>
          <div><SystemHealth /></div>
        </div>

        {selectedVehicle && <VehicleModal vehicle={selectedVehicle} onClose={() => setSelectedVehicle(null)} />}
      </div>
    </MainLayout>
  )
}