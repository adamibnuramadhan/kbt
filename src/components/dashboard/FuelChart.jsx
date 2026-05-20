import React from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine } from 'recharts'
import Card from '../ui/Card'
import { fuelTrend7Days } from '../../data/mockData'

export default function FuelChart() {
  const data = fuelTrend7Days
  const target = 280

  return (
    <Card>
      <div className="flex items-center justify-between">
        <div className="text-xs font-semibold uppercase text-[var(--muted)]">7-DAY FUEL CONSUMPTION</div>
        <div className="text-xs text-[var(--text-secondary)]">LITERS / DAY</div>
      </div>
      <div className="mt-3 h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
            <XAxis dataKey="day" tick={{ fill: 'var(--muted)', fontSize: 12 }} />
            <YAxis tick={{ fill: 'var(--muted)', fontSize: 12 }} />
            <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text)' }} />
            <ReferenceLine y={target} stroke="#f39c12" strokeDasharray="4 4" />
            <Bar dataKey="liters" radius={[6,6,0,0]} fill="#1abc9c">
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
