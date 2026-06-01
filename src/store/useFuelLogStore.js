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

const initialFuelLogs = [
  { id: 'FUEL-1001', date: '2026-06-01', vehicleId: 'VHL-4410-T', liters: 120, cost: 1440000, odometer: 186420 },
  { id: 'FUEL-1002', date: '2026-05-31', vehicleId: 'VHL-2044-U', liters: 95, cost: 1140000, odometer: 194883 },
  { id: 'FUEL-1003', date: '2026-05-30', vehicleId: 'VHL-3108-E', liters: 140, cost: 1680000, odometer: 168532 },
  { id: 'FUEL-1004', date: '2026-05-29', vehicleId: 'VHL-9904-A', liters: 55, cost: 660000, odometer: 66301 },
  { id: 'FUEL-1005', date: '2026-05-28', vehicleId: 'VHL-9033-L', liters: 160, cost: 1920000, odometer: 129010 },
]

const useFuelLogStore = create(
  persist(
    (set) => ({
      fuelLogs: initialFuelLogs,

      loadFuelLogs: async () => {
        try {
          const data = await requestJson('/api/fuel-logs')
          set({ fuelLogs: data })
        } catch (error) {
          console.error('Failed to load fuel logs from API', error)
        }
      },

      addFuelLog: async (fuelLogData) => {
        try {
          const newFuelLog = await requestJson('/api/fuel-logs', {
            method: 'POST',
            body: JSON.stringify(fuelLogData),
          })

          set((state) => ({ fuelLogs: [newFuelLog, ...state.fuelLogs.filter((log) => log.id !== newFuelLog.id)] }))
        } catch (error) {
          console.error('Failed to add fuel log', error)
        }
      },

      updateFuelLog: async (id, fuelLogData) => {
        try {
          const updatedFuelLog = await requestJson(`/api/fuel-logs/${id}`, {
            method: 'PUT',
            body: JSON.stringify(fuelLogData),
          })

          set((state) => ({ fuelLogs: state.fuelLogs.map((log) => (log.id === id ? updatedFuelLog : log)) }))
        } catch (error) {
          console.error('Failed to update fuel log', error)
        }
      },

      deleteFuelLog: async (id) => {
        try {
          await requestJson(`/api/fuel-logs/${id}`, { method: 'DELETE' })
          set((state) => ({ fuelLogs: state.fuelLogs.filter((log) => log.id !== id) }))
        } catch (error) {
          console.error('Failed to delete fuel log', error)
        }
      },
    }),
    {
      name: 'fg-fuel-log-store',
    },
  ),
)

export default useFuelLogStore