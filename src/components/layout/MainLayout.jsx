import { useEffect } from 'react'
import Sidebar from './Sidebar'
import TopBar from './TopBar'
import useUIStore from '../../store/useUIStore'
import QuickActionModal from '../ui/QuickActionModal'
import useFleetStore from '../../store/useFleetStore'
import useDriverStore from '../../store/useDriverStore'
import useFuelLogStore from '../../store/useFuelLogStore'
import useMaintenanceStore from '../../store/useMaintenanceStore'

function MainLayout({ children }) {
  const sidebarOpen = useUIStore((state) => state.sidebarOpen)
  const activeModal = useUIStore((state) => state.activeModal)
  const openModal = useUIStore((state) => state.openModal)
  const toggleSidebar = useUIStore((state) => state.toggleSidebar)
  const loadVehicles = useFleetStore((state) => state.loadVehicles)
  const loadDrivers = useDriverStore((state) => state.loadDrivers)
  const loadFuelLogs = useFuelLogStore((state) => state.loadFuelLogs)
  const loadMaintenanceLogs = useMaintenanceStore((state) => state.loadMaintenanceLogs)

  useEffect(() => {
    loadVehicles()
    loadDrivers()
    loadFuelLogs()
    loadMaintenanceLogs()
  }, [loadVehicles, loadDrivers, loadFuelLogs, loadMaintenanceLogs])

  return (
    <div className="relative flex min-h-screen bg-[var(--bg-primary)] text-[var(--text)]">
      {sidebarOpen && <button type="button" aria-label="Close sidebar overlay" onClick={toggleSidebar} className="fixed inset-0 z-40 bg-black/40 md:hidden" />}
      <Sidebar />
      <div className="relative flex min-h-screen flex-1 flex-col">
        <TopBar />
        <main className="page-enter flex-1 overflow-y-auto p-8">{children}</main>
      </div>
      {activeModal === 'quick-add' && <QuickActionModal />}
      <button
        type="button"
        onClick={() => openModal('quick-add')}
        className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-5 py-3 text-sm font-medium text-white shadow-lg transition hover:-translate-y-0.5"
      >
        <span className="text-lg leading-none">+</span>
        <span className="hidden sm:inline">Quick Add</span>
      </button>
    </div>
  )
}

export default MainLayout