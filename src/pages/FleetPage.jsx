import { useMemo, useState } from 'react'
import MainLayout from '../components/layout/MainLayout'
import Card from '../components/ui/Card'
import VehicleTable from '../components/fleet/VehicleTable'
import FleetMap from '../components/fleet/FleetMap'
import SystemHealth from '../components/fleet/SystemHealth'
import VehicleModal from '../components/fleet/VehicleModal'
import VehicleFormModal from '../components/fleet/VehicleFormModal'
import useFleetStore from '../store/useFleetStore'

export default function FleetPage() {
  const { vehicles, addVehicle, updateVehicle, deleteVehicle } = useFleetStore()
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedVehicle, setSelectedVehicle] = useState(null)
  
  // States for CRUD Modal
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [vehicleToEdit, setVehicleToEdit] = useState(null)

  const filtered = useMemo(() => {
    if (activeFilter === 'all') return vehicles
    if (activeFilter === 'lowFuel') return vehicles.filter((v) => v.fuelLevel < 20)
    if (activeFilter === 'moving') return vehicles.filter((v) => v.status === 'moving')
    if (activeFilter === 'idle') return vehicles.filter((v) => v.status === 'idle')
    return vehicles
  }, [activeFilter, vehicles])

  const filters = [
    { key: 'all', label: 'All' },
    { key: 'lowFuel', label: 'Low Fuel' },
    { key: 'moving', label: 'Moving' },
    { key: 'idle', label: 'Idle' },
  ]

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-xl text-[var(--text)]">Fleet Inventory</h1>
              <p className="mt-1 text-sm text-[var(--muted)]">Manage and monitor your vehicles</p>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => { setVehicleToEdit(null); setIsFormOpen(true); }}
                className="rounded-[var(--radius-button)] bg-[var(--primary)] px-3.5 py-2 text-[13px] font-medium text-white shadow-[var(--shadow-button)] hover:bg-[var(--primary-dark)] transition-colors">
                + Add Vehicle
              </button>
              <button className="rounded-[var(--radius-button)] border border-[var(--border-strong)] px-3.5 py-2 text-[13px] font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] transition-colors">Export</button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                activeFilter === f.key
                  ? 'bg-[var(--primary-ghost)] text-[var(--primary)]'
                  : 'text-[var(--muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]'
              }`}>
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <Card>
            <div className="text-[11px] font-medium uppercase tracking-wider text-[var(--muted)]">Total</div>
            <div className="mt-2 text-2xl font-display text-[var(--text)]">{vehicles.length}</div>
          </Card>
          <Card>
            <div className="text-[11px] font-medium uppercase tracking-wider text-[var(--muted)]">Active</div>
            <div className="mt-2 text-2xl font-display text-[var(--text)]">{vehicles.filter((v) => v.status === 'moving').length}</div>
          </Card>
          <Card>
            <div className="text-[11px] font-medium uppercase tracking-wider text-[var(--muted)]">Low Fuel</div>
            <div className="mt-2 text-2xl font-display text-[var(--error)]">{vehicles.filter((v) => v.fuelLevel < 20).length}</div>
          </Card>
          <Card>
            <div className="text-[11px] font-medium uppercase tracking-wider text-[var(--muted)]">Avg Efficiency</div>
            <div className="mt-2 text-2xl font-display text-[var(--text)]">{vehicles.length ? (vehicles.reduce((s, v) => s + (v.efficiency || 0), 0) / vehicles.length).toFixed(1) : 0} <span className="text-sm text-[var(--muted)]">km/L</span></div>
          </Card>
        </div>

        <VehicleTable 
          vehicles={filtered} 
          onRowClick={(v) => setSelectedVehicle(v)} 
          onEditClick={(v) => { setVehicleToEdit(v); setIsFormOpen(true); }}
          onDeleteClick={(v) => {
            if (window.confirm(`Are you sure you want to delete vehicle ${v.plateNumber} (${v.id})?`)) {
              deleteVehicle(v.id);
            }
          }}
        />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2"><FleetMap vehicles={filtered} /></div>
          <div><SystemHealth /></div>
        </div>

        {selectedVehicle && <VehicleModal vehicle={selectedVehicle} onClose={() => setSelectedVehicle(null)} />}
        
        {isFormOpen && (
          <VehicleFormModal 
            vehicle={vehicleToEdit} 
            onClose={() => setIsFormOpen(false)} 
            onSave={(formData) => {
              if (vehicleToEdit) {
                updateVehicle(vehicleToEdit.id, formData);
              } else {
                addVehicle(formData);
              }
              setIsFormOpen(false);
            }} 
          />
        )}
      </div>
    </MainLayout>
  )
}