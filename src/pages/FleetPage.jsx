import { useMemo, useState } from 'react'
import MainLayout from '../components/layout/MainLayout'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
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

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <p className="text-xs text-[var(--muted)] uppercase tracking-widest">Management Console</p>
          <div className="mt-2 flex items-center justify-between">
            <h1 className="font-display text-2xl">Fleet Inventory</h1>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => { setVehicleToEdit(null); setIsFormOpen(true); }}
                className="rounded-md bg-[var(--primary)] px-3 py-2 text-sm text-white hover:opacity-90">
                + Add Vehicle
              </button>
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
            <div className="mt-2 text-2xl font-bold">{vehicles.length}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-[var(--muted)]">Active Now</div>
            <div className="mt-2 text-2xl font-bold">{vehicles.filter((v) => v.status === 'moving').length}</div>
          </Card>
          <Card className="p-4 border-[var(--error)]">
            <div className="text-sm text-[var(--muted)]">Low Fuel Alerts</div>
            <div className="mt-2 text-2xl font-bold text-[var(--error)]">{vehicles.filter((v) => v.fuelLevel < 20).length}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-[var(--muted)]">Avg Efficiency</div>
            <div className="mt-2 text-2xl font-bold">{vehicles.length ? (vehicles.reduce((s, v) => s + (v.efficiency || 0), 0) / vehicles.length).toFixed(1) : 0} km/L</div>
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

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2"><FleetMap vehicles={filtered.slice(0, 8)} /></div>
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