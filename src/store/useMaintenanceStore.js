import { create } from 'zustand'
import { persist } from 'zustand/middleware'

async function requestJson(url, options = {}) {
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}))
    throw new Error(errorBody.message || `Request failed with status ${response.status}`)
  }

  if (response.status === 204) return null
  return response.json()
}

const initialMaintenanceLogs = [
  { id: 'MT-2001', vehicleId: 'VHL-4410-T', scheduledDate: '2026-06-03', status: 'Scheduled', notes: 'Oil change and brake inspection', completedDate: '' },
  { id: 'MT-2002', vehicleId: 'VHL-2044-U', scheduledDate: '2026-06-05', status: 'Scheduled', notes: 'Filter replacement', completedDate: '' },
  { id: 'MT-2003', vehicleId: 'VHL-5522-Y', scheduledDate: '2026-05-28', status: 'Completed', notes: 'Full service and tire balancing', completedDate: '2026-05-28' },
  { id: 'MT-2004', vehicleId: 'VHL-9033-L', scheduledDate: '2026-06-10', status: 'Scheduled', notes: 'Fuel injector check', completedDate: '' },
]

const useMaintenanceStore = create(
  persist(
    (set) => ({
      maintenanceLogs: initialMaintenanceLogs,

      loadMaintenanceLogs: async () => {
        try {
          const data = await requestJson('/api/maintenance-logs')
          set({ maintenanceLogs: data })
        } catch (error) {
          console.error('Failed to load maintenance logs from API', error)
        }
      },

      addMaintenanceLog: async (maintenanceData) => {
        try {
          const newMaintenanceLog = await requestJson('/api/maintenance-logs', {
            method: 'POST',
            body: JSON.stringify(maintenanceData),
          })

          set((state) => ({ maintenanceLogs: [newMaintenanceLog, ...state.maintenanceLogs.filter((log) => log.id !== newMaintenanceLog.id)] }))
        } catch (error) {
          console.error('Failed to add maintenance log', error)
        }
      },

      updateMaintenanceLog: async (id, maintenanceData) => {
        try {
          const updatedMaintenanceLog = await requestJson(`/api/maintenance-logs/${id}`, {
            method: 'PUT',
            body: JSON.stringify(maintenanceData),
          })

          set((state) => ({ maintenanceLogs: state.maintenanceLogs.map((log) => (log.id === id ? updatedMaintenanceLog : log)) }))
        } catch (error) {
          console.error('Failed to update maintenance log', error)
        }
      },

      deleteMaintenanceLog: async (id) => {
        try {
          await requestJson(`/api/maintenance-logs/${id}`, { method: 'DELETE' })
          set((state) => ({ maintenanceLogs: state.maintenanceLogs.filter((log) => log.id !== id) }))
        } catch (error) {
          console.error('Failed to delete maintenance log', error)
        }
      },
    }),
    {
      name: 'fg-maintenance-store',
    },
  ),
)

export default useMaintenanceStore