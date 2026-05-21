import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { vehicles as initialVehicles } from '../data/mockData'

const useFleetStore = create(
  persist(
    (set) => ({
      vehicles: initialVehicles,
      
      addVehicle: (vehicleData) => set((state) => {
        // Generate a new ID if not provided
        const newId = vehicleData.id || `VHL-${Math.floor(1000 + Math.random() * 9000)}-${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`;
        const newVehicle = {
          ...vehicleData,
          id: newId,
          lastUpdated: 'Baru saja',
          mileage: vehicleData.mileage || 0,
          efficiency: vehicleData.efficiency || 0,
          fuelLevel: vehicleData.fuelLevel || 100,
        };
        return { vehicles: [newVehicle, ...state.vehicles] };
      }),
      
      updateVehicle: (id, vehicleData) => set((state) => ({
        vehicles: state.vehicles.map((v) => 
          v.id === id ? { ...v, ...vehicleData, lastUpdated: 'Baru saja' } : v
        )
      })),
      
      deleteVehicle: (id) => set((state) => ({
        vehicles: state.vehicles.filter((v) => v.id !== id)
      }))
    }),
    {
      name: 'fg-fleet-store',
    }
  )
)

export default useFleetStore;
