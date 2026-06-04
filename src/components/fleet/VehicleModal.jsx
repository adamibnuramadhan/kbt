import Modal from '../ui/Modal'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function VehicleModal({ vehicle, onClose }) {
  if (!vehicle) return null

  const data = [
    { day: 'Mon', v: Math.max(10, vehicle.fuelLevel - 6) },
    { day: 'Tue', v: Math.max(10, vehicle.fuelLevel - 4) },
    { day: 'Wed', v: vehicle.fuelLevel },
    { day: 'Thu', v: Math.min(100, vehicle.fuelLevel + 3) },
    { day: 'Fri', v: Math.min(100, vehicle.fuelLevel + 6) },
    { day: 'Sat', v: Math.min(100, vehicle.fuelLevel + 2) },
    { day: 'Sun', v: Math.min(100, vehicle.fuelLevel + 1) },
  ]

  return (
    <Modal isOpen={true} onClose={onClose} title={vehicle.id} size="lg">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-sm text-[var(--muted)]">Driver</div>
          <div className="text-lg font-medium">{vehicle.driver}</div>

          <div className="mt-3 text-sm text-[var(--muted)]">Location</div>
          <div className="text-sm">{vehicle.location}</div>

          <div className="mt-3 text-sm text-[var(--muted)]">Fuel Level</div>
          <div className="text-lg font-mono">{vehicle.fuelLevel}%</div>

          <div className="mt-3 text-sm text-[var(--muted)]">Efficiency</div>
          <div className="text-sm">{vehicle.efficiency} km/L</div>
        </div>

        <div>
          <div className="text-sm text-[var(--muted)]">7-Day Fuel History</div>
          <div className="mt-2 h-40">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <XAxis dataKey="day" tick={{ fill: 'var(--muted)' }} />
                <YAxis tick={{ fill: 'var(--muted)' }} />
                <Tooltip />
                <Line type="monotone" dataKey="v" stroke="#1abc9c" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <button onClick={onClose} className="rounded border border-[var(--border)] px-3 py-2 text-sm text-[var(--text-secondary)]">Close</button>
        <button onClick={() => { onClose(); }} className="rounded bg-[var(--primary)] px-3 py-2 text-sm text-white">View Full Report</button>
      </div>
    </Modal>
  )
}
