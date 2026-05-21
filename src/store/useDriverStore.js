import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const initialDrivers = [
  { id: 'DRV-101', name: 'Marcus Holloway', licenseNumber: 'SIM-9021-X', phone: '+62-812-3456-7890', licenseExpiry: '2027-05-12', status: 'active' },
  { id: 'DRV-102', name: 'Sarah Jenkins', licenseNumber: 'SIM-3341-T', phone: '+62-811-2244-9931', licenseExpiry: '2026-11-20', status: 'active' },
  { id: 'DRV-103', name: 'David Chen', licenseNumber: 'SIM-1192-M', phone: '+62-813-5566-1188', licenseExpiry: '2028-02-15', status: 'active' },
  { id: 'DRV-104', name: 'Emily Blunt', licenseNumber: 'SIM-5522-Y', phone: '+62-822-3344-7711', licenseExpiry: '2025-09-10', status: 'active' },
  { id: 'DRV-105', name: 'Ayu Maharani', licenseNumber: 'SIM-9904-A', phone: '+62-813-7788-9900', licenseExpiry: '2029-01-30', status: 'active' },
  { id: 'DRV-106', name: 'Andi Nugroho', licenseNumber: 'SIM-8301-B', phone: '+62-821-4455-6677', licenseExpiry: '2026-06-22', status: 'inactive' },
  { id: 'DRV-107', name: 'Nadia Putri', licenseNumber: 'SIM-6721-Q', phone: '+62-812-9090-1212', licenseExpiry: '2027-12-05', status: 'active' },
  { id: 'DRV-108', name: 'Fajar Hidayat', licenseNumber: 'SIM-3108-E', phone: '+62-878-3322-5566', licenseExpiry: '2025-10-18', status: 'active' },
  { id: 'DRV-109', name: 'Rian Maulana', licenseNumber: 'SIM-2044-U', phone: '+62-821-9900-7744', licenseExpiry: '2028-08-08', status: 'active' },
  { id: 'DRV-110', name: 'Lina Anggraini', licenseNumber: 'SIM-5588-J', phone: '+62-857-6633-1122', licenseExpiry: '2026-03-14', status: 'active' },
  { id: 'DRV-111', name: 'Gilang Ramadhan', licenseNumber: 'SIM-9033-L', phone: '+62-813-1199-5544', licenseExpiry: '2027-04-21', status: 'active' },
  { id: 'DRV-112', name: 'Maya Salsabila', licenseNumber: 'SIM-4477-N', phone: '+62-812-8866-2255', licenseExpiry: '2029-11-11', status: 'active' },
]

const useDriverStore = create(
  persist(
    (set) => ({
      drivers: initialDrivers,
      
      addDriver: (driverData) => set((state) => {
        const newId = driverData.id || `DRV-${Math.floor(100 + Math.random() * 900)}`;
        const newDriver = {
          ...driverData,
          id: newId,
        };
        return { drivers: [newDriver, ...state.drivers] };
      }),
      
      updateDriver: (id, driverData) => set((state) => ({
        drivers: state.drivers.map((d) => 
          d.id === id ? { ...d, ...driverData } : d
        )
      })),
      
      deleteDriver: (id) => set((state) => ({
        drivers: state.drivers.filter((d) => d.id !== id)
      }))
    }),
    {
      name: 'fg-driver-store',
    }
  )
)

export default useDriverStore;
