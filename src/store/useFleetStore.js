import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { vehicles as initialVehicles } from '../data/mockData'

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

const useFleetStore = create(
  persist(
    (set) => ({
      vehicles: initialVehicles,

      loadVehicles: async () => {
        try {
          const data = await requestJson('/api/vehicles')
          set({ vehicles: data })
        } catch (error) {
          console.error('Failed to load vehicles from API', error)
        }
      },
      
      addVehicle: async (vehicleData) => {
        try {
          const newVehicle = await requestJson('/api/vehicles', {
            method: 'POST',
            body: JSON.stringify({
              ...vehicleData,
              driver: vehicleData.driver || '',
              driverPhone: vehicleData.driverPhone || '',
              lastUpdated: vehicleData.lastUpdated || 'Baru saja',
            }),
          })

          set((state) => ({ vehicles: [newVehicle, ...state.vehicles.filter((vehicle) => vehicle.id !== newVehicle.id)] }))
        } catch (error) {
          console.error('Failed to add vehicle', error)
        }
      },
      
      updateVehicle: async (id, vehicleData) => {
        try {
          const updatedVehicle = await requestJson(`/api/vehicles/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
              ...vehicleData,
              driver: vehicleData.driver || '',
              driverPhone: vehicleData.driverPhone || '',
              lastUpdated: vehicleData.lastUpdated || 'Baru saja',
            }),
          })

          set((state) => ({ vehicles: state.vehicles.map((vehicle) => (vehicle.id === id ? updatedVehicle : vehicle)) }))
        } catch (error) {
          console.error('Failed to update vehicle', error)
        }
      },
      
      deleteVehicle: async (id) => {
        try {
          await requestJson(`/api/vehicles/${id}`, { method: 'DELETE' })
          set((state) => ({ vehicles: state.vehicles.filter((vehicle) => vehicle.id !== id) }))
        } catch (error) {
          console.error('Failed to delete vehicle', error)
        }
      },
    }),
    {
      name: 'fg-fleet-store',
    }
  )
)

export default useFleetStore;
