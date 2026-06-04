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
        <div className="text-[11px] font-medium uppercase tracking-wider text-[var(--muted)]">7-Day Fuel Consumption</div>
        <div className="text-[10px] text-[var(--muted)]">Liters / Day</div>
      </div>
      <div className="mt-4 h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap="25%">
            <CartesianGrid stroke="var(--border)" strokeDasharray="0" vertical={false} />
            <XAxis dataKey="day" tick={{ fill: 'var(--muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'var(--muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--bg-elevated)',
                border: '1px solid var(--border-strong)',
                borderRadius: '8px',
                color: 'var(--text)',
                fontSize: '12px',
                boxShadow: 'var(--shadow-float)',
              }}
              cursor={{ fill: 'var(--bg-hover)', radius: 6 }}
            />
            <ReferenceLine y={target} stroke="var(--warning)" strokeDasharray="4 4" strokeOpacity={0.5} />
            <Bar dataKey="liters" radius={[6,6,0,0]} fill="var(--primary)" opacity={0.85} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
