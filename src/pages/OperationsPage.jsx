import { useMemo, useState } from 'react'
import MainLayout from '../components/layout/MainLayout'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import EmptyState from '../components/ui/EmptyState'
import OperationRecordModal from '../components/operations/OperationRecordModal'
import useFleetStore from '../store/useFleetStore'
import useDriverStore from '../store/useDriverStore'
import useFuelLogStore from '../store/useFuelLogStore'
import useMaintenanceStore from '../store/useMaintenanceStore'

const TABS = [
  { key: 'fuel', label: 'Fuel Logs' },
  { key: 'drivers', label: 'Drivers' },
  { key: 'maintenance', label: 'Maintenance' },
]

const today = new Date().toISOString().slice(0, 10)

const currency = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 })
const dateFormatter = new Intl.DateTimeFormat('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })

function formatDate(value) {
  if (!value) return '-'
  const parsed = new Date(value)
  return Number.isNaN(parsed.getTime()) ? value : dateFormatter.format(parsed)
}

function vehicleLabel(vehicle) {
  if (!vehicle) return '-'
  return `${vehicle.id} · ${vehicle.plateNumber}`
}

function statusBadge(status) {
  if (status === 'Completed' || status === 'active') return 'success'
  if (status === 'Scheduled' || status === 'pending') return 'warning'
  if (status === 'inactive') return 'error'
  return 'info'
}

export default function OperationsPage() {
  const { vehicles } = useFleetStore()
  const { drivers, addDriver, updateDriver, deleteDriver } = useDriverStore()
  const { fuelLogs, addFuelLog, updateFuelLog, deleteFuelLog } = useFuelLogStore()
  const { maintenanceLogs, addMaintenanceLog, updateMaintenanceLog, deleteMaintenanceLog } = useMaintenanceStore()

  const [activeTab, setActiveTab] = useState('fuel')
  const [selectedVehicleId, setSelectedVehicleId] = useState('all')
  const [modalState, setModalState] = useState({ open: false, kind: null, record: null })

  const vehicleOptions = useMemo(() => vehicles.map((vehicle) => ({ value: vehicle.id, label: vehicleLabel(vehicle) })), [vehicles])
  const vehicleMap = useMemo(() => Object.fromEntries(vehicles.map((vehicle) => [vehicle.id, vehicle])), [vehicles])

  const fuelFields = [
    { name: 'date', label: 'Tanggal', type: 'date', required: true },
    { name: 'vehicleId', label: 'ID Kendaraan', type: 'select', required: true, options: vehicleOptions },
    { name: 'liters', label: 'Jumlah Liter', type: 'number', required: true, min: '0', step: '0.01', placeholder: '0' },
    { name: 'cost', label: 'Biaya', type: 'number', required: true, min: '0', step: '1', placeholder: '0' },
    { name: 'odometer', label: 'Posisi Odometer / KM', type: 'number', required: true, min: '0', step: '1', placeholder: '0' },
  ]

  const driverFields = [
    { name: 'name', label: 'Nama', type: 'text', required: true, placeholder: 'Nama pengemudi' },
    { name: 'licenseNumber', label: 'Nomor SIM', type: 'text', required: true, placeholder: 'SIM-1234-X' },
    { name: 'phone', label: 'Kontak', type: 'text', required: true, placeholder: '+62...' },
    { name: 'licenseExpiry', label: 'Masa Berlaku SIM', type: 'date', required: true },
    { name: 'assignedVehicleId', label: 'Kendaraan Saat Ini', type: 'select', required: false, options: [{ value: '', label: 'Belum ditugaskan' }, ...vehicleOptions] },
    { name: 'status', label: 'Status', type: 'select', required: true, options: [{ value: 'active', label: 'Active' }, { value: 'inactive', label: 'Inactive' }] },
  ]

  const maintenanceFields = [
    { name: 'vehicleId', label: 'ID Kendaraan', type: 'select', required: true, options: vehicleOptions },
    { name: 'scheduledDate', label: 'Tanggal Servis', type: 'date', required: true },
    { name: 'status', label: 'Status', type: 'select', required: true, options: [{ value: 'Scheduled', label: 'Scheduled' }, { value: 'Completed', label: 'Completed' }] },
    { name: 'notes', label: 'Catatan Servis', type: 'textarea', fullWidth: true, rows: 4, placeholder: 'Detail servis, keluhan, atau pekerjaan yang dilakukan' },
    { name: 'completedDate', label: 'Tanggal Selesai', type: 'date', required: false },
  ]

  const fuelRecords = selectedVehicleId === 'all' ? fuelLogs : fuelLogs.filter((log) => log.vehicleId === selectedVehicleId)
  const upcomingMaintenance = maintenanceLogs.filter((log) => log.status === 'Scheduled').slice(0, 3)

  const openCreate = (kind) => setModalState({ open: true, kind, record: null })
  const openEdit = (kind, record) => setModalState({ open: true, kind, record })
  const closeModal = () => setModalState({ open: false, kind: null, record: null })

  const defaultFuel = {
    date: today,
    vehicleId: vehicles[0]?.id || '',
    liters: '',
    cost: '',
    odometer: '',
  }

  const defaultDriver = {
    name: '',
    licenseNumber: '',
    phone: '',
    licenseExpiry: today,
    assignedVehicleId: '',
    status: 'active',
  }

  const defaultMaintenance = {
    vehicleId: vehicles[0]?.id || '',
    scheduledDate: today,
    status: 'Scheduled',
    notes: '',
    completedDate: '',
  }

  const handleSave = (formData) => {
    if (modalState.kind === 'fuel') {
      if (modalState.record) updateFuelLog(modalState.record.id, formData)
      else addFuelLog(formData)
    }

    if (modalState.kind === 'drivers') {
      if (modalState.record) updateDriver(modalState.record.id, formData)
      else addDriver(formData)
    }

    if (modalState.kind === 'maintenance') {
      if (modalState.record) updateMaintenanceLog(modalState.record.id, formData)
      else addMaintenanceLog(formData)
    }

    closeModal()
  }

  const renderFuelTab = () => (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-sm text-[var(--muted)]">Filter kendaraan</div>
            <select
              value={selectedVehicleId}
              onChange={(event) => setSelectedVehicleId(event.target.value)}
              className="mt-2 min-w-64 rounded-md border border-[var(--border)] bg-[var(--bg-primary)] px-3 py-2 text-sm text-[var(--text)]"
            >
              <option value="all">Semua kendaraan</option>
              {vehicleOptions.map((vehicle) => (
                <option key={vehicle.value} value={vehicle.value}>{vehicle.label}</option>
              ))}
            </select>
          </div>
          <button onClick={() => openCreate('fuel')} className="rounded-md bg-[var(--primary)] px-4 py-2 text-sm text-white">
            + Tambah Log BBM
          </button>
        </div>
      </Card>

      <Card noPadding>
        <div className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)]">
          {fuelRecords.length === 0 ? (
            <div className="p-6">
              <EmptyState title="Belum ada log pengisian" description="Tambahkan data pengisian bahan bakar agar konsumsi per kendaraan bisa dilacak dengan akurat." actionLabel="Tambah Log BBM" onAction={() => openCreate('fuel')} />
            </div>
          ) : (
            <table className="w-full table-auto border-collapse bg-[var(--bg-primary)]">
              <thead className="bg-[var(--bg-primary)] text-left text-xs text-[var(--muted)]">
                <tr>
                  <th className="px-4 py-3">Tanggal</th>
                  <th className="px-4 py-3">Kendaraan</th>
                  <th className="px-4 py-3">Liter</th>
                  <th className="px-4 py-3">Biaya</th>
                  <th className="px-4 py-3">Odometer</th>
                  <th className="px-4 py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {fuelRecords.map((log) => (
                  <tr key={log.id} className="border-t border-[var(--border)] hover:bg-[var(--bg-hover)]">
                    <td className="px-4 py-3 text-sm text-[var(--text-secondary)]">{formatDate(log.date)}</td>
                    <td className="px-4 py-3 text-sm">
                      <div>{log.vehicleId}</div>
                      <div className="text-xs text-[var(--muted)]">{vehicleMap[log.vehicleId]?.plateNumber || '-'}</div>
                    </td>
                    <td className="px-4 py-3 text-sm font-mono">{Number(log.liters).toFixed(2)} L</td>
                    <td className="px-4 py-3 text-sm font-mono">{currency.format(Number(log.cost) || 0)}</td>
                    <td className="px-4 py-3 text-sm font-mono">{Number(log.odometer).toLocaleString('id-ID')} km</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => openEdit('fuel', log)} className="rounded bg-[var(--bg-hover)] px-2 py-1 text-xs text-[var(--text-secondary)]">Edit</button>
                        <button onClick={() => deleteFuelLog(log.id)} className="rounded bg-[var(--bg-hover)] px-2 py-1 text-xs text-[var(--text-secondary)] hover:text-[var(--error)]">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Card>
    </div>
  )

  const renderDriverTab = () => (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button onClick={() => openCreate('drivers')} className="rounded-md bg-[var(--primary)] px-4 py-2 text-sm text-white">
          + Tambah Pengemudi
        </button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {drivers.map((driver) => (
          <Card key={driver.id} className="p-4" hover>
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-semibold">{driver.name}</div>
                <div className="mt-1 text-sm text-[var(--muted)]">{driver.licenseNumber}</div>
              </div>
              <Badge variant={statusBadge(driver.status)}>{driver.status}</Badge>
            </div>
            <div className="mt-4 space-y-2 text-sm text-[var(--text-secondary)]">
              <div>Kontak: {driver.phone}</div>
              <div>Masa SIM: {formatDate(driver.licenseExpiry)}</div>
              <div>Kendaraan: {vehicleLabel(vehicleMap[driver.assignedVehicleId])}</div>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => openEdit('drivers', driver)} className="rounded bg-[var(--bg-hover)] px-2 py-1 text-xs text-[var(--text-secondary)]">Edit</button>
              <button onClick={() => deleteDriver(driver.id)} className="rounded bg-[var(--bg-hover)] px-2 py-1 text-xs text-[var(--text-secondary)] hover:text-[var(--error)]">Delete</button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderMaintenanceTab = () => (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-sm text-[var(--muted)]">Jadwal servis terdekat</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {upcomingMaintenance.map((log) => (
                <Badge key={log.id} variant="warning">{log.vehicleId} · {formatDate(log.scheduledDate)}</Badge>
              ))}
              {upcomingMaintenance.length === 0 && <span className="text-sm text-[var(--muted)]">Tidak ada jadwal mendekati jatuh tempo</span>}
            </div>
          </div>
          <button onClick={() => openCreate('maintenance')} className="rounded-md bg-[var(--primary)] px-4 py-2 text-sm text-white">
            + Jadwal Servis
          </button>
        </div>
      </Card>

      <Card noPadding>
        <div className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)]">
          <table className="w-full table-auto border-collapse bg-[var(--bg-primary)]">
            <thead className="bg-[var(--bg-primary)] text-left text-xs text-[var(--muted)]">
              <tr>
                <th className="px-4 py-3">Kendaraan</th>
                <th className="px-4 py-3">Tanggal</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Catatan</th>
                <th className="px-4 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {maintenanceLogs.map((log) => (
                <tr key={log.id} className="border-t border-[var(--border)] hover:bg-[var(--bg-hover)]">
                  <td className="px-4 py-3 text-sm">
                    <div>{log.vehicleId}</div>
                    <div className="text-xs text-[var(--muted)]">{vehicleMap[log.vehicleId]?.plateNumber || '-'}</div>
                  </td>
                  <td className="px-4 py-3 text-sm text-[var(--text-secondary)]">{formatDate(log.scheduledDate)}</td>
                  <td className="px-4 py-3"><Badge variant={statusBadge(log.status)}>{log.status}</Badge></td>
                  <td className="px-4 py-3 text-sm text-[var(--muted)]">{log.notes || '-'}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => openEdit('maintenance', log)} className="rounded bg-[var(--bg-hover)] px-2 py-1 text-xs text-[var(--text-secondary)]">Edit</button>
                      <button onClick={() => deleteMaintenanceLog(log.id)} className="rounded bg-[var(--bg-hover)] px-2 py-1 text-xs text-[var(--text-secondary)] hover:text-[var(--error)]">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )

  const modalConfig = modalState.kind === 'fuel'
    ? { title: modalState.record ? 'Edit Log Pengisian' : 'Tambah Log Pengisian', subtitle: 'Catat tanggal, kendaraan, liter, biaya, dan odometer.', fields: fuelFields, initialValues: modalState.record || defaultFuel }
    : modalState.kind === 'drivers'
      ? { title: modalState.record ? 'Edit Pengemudi' : 'Tambah Pengemudi', subtitle: 'Kelola profil pengemudi dan kendaraan yang sedang dioperasikan.', fields: driverFields, initialValues: modalState.record || defaultDriver }
      : { title: modalState.record ? 'Edit Jadwal Servis' : 'Tambah Jadwal Servis', subtitle: 'Kelola jadwal dan status pemeliharaan kendaraan.', fields: maintenanceFields, initialValues: modalState.record || defaultMaintenance }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Operations Center</p>
          <h1 className="mt-2 font-display text-3xl">Fuel, Driver, and Maintenance Logs</h1>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">CRUD terpusat untuk log pengisian BBM, pengemudi aktif, dan jadwal servis kendaraan.</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-full px-4 py-2 text-sm ${activeTab === tab.key ? 'bg-[var(--primary)] text-white' : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border border-[var(--border)]'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'fuel' && renderFuelTab()}
        {activeTab === 'drivers' && renderDriverTab()}
        {activeTab === 'maintenance' && renderMaintenanceTab()}

        <OperationRecordModal
          key={`${modalState.kind}-${modalState.record?.id || 'new'}`}
          isOpen={modalState.open}
          onClose={closeModal}
          title={modalConfig.title}
          subtitle={modalConfig.subtitle}
          fields={modalConfig.fields}
          initialValues={modalConfig.initialValues}
          onSave={handleSave}
        />
      </div>
    </MainLayout>
  )
}