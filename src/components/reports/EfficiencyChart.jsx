import React from 'react'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, AreaChart, Area } from 'recharts'
import Card from '../ui/Card'
import { fuelTrend7Days, kpiData } from '../../data/mockData'

export default function EfficiencyChart() {
  const data = fuelTrend7Days.map((d, i) => ({ day: d.day, val: Math.round((kpiData.avgEfficiency + (i % 3) * 0.2) * 10) / 10 }))

  return (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold uppercase text-[var(--muted)]">EFFICIENCY TREND</div>
          <div className="text-2xl font-display text-[var(--primary)]">92.4%</div>
        </div>
      </div>

      <div className="mt-4 h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="day" tick={{ fill: 'var(--muted)' }} />
            <YAxis tick={{ fill: 'var(--muted)' }} />
            <Tooltip />
            <Line type="monotone" dataKey="val" stroke="#1abc9c" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}

