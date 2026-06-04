import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'
import Card from '../ui/Card'
import { consumptionByRoute } from '../../data/mockData'

export default function ConsumptionChart() {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold uppercase text-[var(--muted)]">CONSUMPTION BY ROUTE (LITERS)</div>
      </div>

      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={consumptionByRoute} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
            <XAxis dataKey="route" tick={{ fill: 'var(--muted)' }} />
            <YAxis tick={{ fill: 'var(--muted)' }} />
            <Tooltip />
            <Bar dataKey="liters" fill="#1abc9c" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}

