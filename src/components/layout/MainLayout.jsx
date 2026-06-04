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
    <div className="relative flex h-screen bg-[var(--bg-primary)] text-[var(--text)]">
      {sidebarOpen && <button type="button" aria-label="Close sidebar overlay" onClick={toggleSidebar} className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[1px] md:hidden" />}
      <Sidebar />
      <div className="relative flex h-screen flex-1 flex-col overflow-hidden">
        <TopBar />
        <main className="page-enter flex-1 overflow-y-auto p-6 lg:p-8">{children}</main>
      </div>
      {activeModal === 'quick-add' && <QuickActionModal />}
      <button
        type="button"
        onClick={() => openModal('quick-add')}
        className="fixed bottom-5 right-5 z-40 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary)] text-white shadow-[var(--shadow-float)] transition-transform hover:scale-105 active:scale-95"
        aria-label="Quick Add"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>
    </div>
  )
}

export default MainLayout