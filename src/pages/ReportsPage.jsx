import React, { useState } from 'react'
import TabNav from '../components/reports/TabNav'
import ConsumptionChart from '../components/reports/ConsumptionChart'
import EfficiencyChart from '../components/reports/EfficiencyChart'
import BudgetForecast from '../components/reports/BudgetForecast'
import Card from '../components/ui/Card'
import EmptyState from '../components/ui/EmptyState'
import MainLayout from '../components/layout/MainLayout'
import { consumptionByRoute } from '../data/mockData'

const TABS = ['Consumption', 'Efficiency', 'Route', 'Predictive']

export default function ReportsPage() {
  const [active, setActive] = useState('Consumption')

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <div className="text-2xl font-display">Analytics & Reports</div>
          <div className="text-sm text-[var(--muted)]">Detailed performance metrics and fuel telemetry insights.</div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <div className="w-3/4">
              <TabNav tabs={TABS} active={active} onChange={setActive} />
            </div>
            <div className="flex items-center gap-2">
              <button className="rounded bg-[var(--primary)] px-3 py-2 text-sm text-white">Export PDF</button>
            </div>
          </div>
        </div>

        <div>
          {active === 'Consumption' && (
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <ConsumptionChart />
              </div>
              <div className="col-span-1 space-y-4">
                <EfficiencyChart />
                <BudgetForecast />
              </div>
            </div>
          )}

          {active === 'Efficiency' && (
            <div className="grid grid-cols-2 gap-4">
              <EfficiencyChart />
              <Card>
                <div className="text-sm font-semibold text-[var(--muted)]">Efficiency Rankings</div>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between"><div>Truck-B29</div><div className="font-mono">9.2 km/L</div></div>
                  <div className="flex items-center justify-between"><div>Van-C15</div><div className="font-mono">8.8 km/L</div></div>
                  <div className="flex items-center justify-between"><div>Truck-A08</div><div className="font-mono">8.2 km/L</div></div>
                </div>
              </Card>
            </div>
          )}

          {active === 'Route' && (
            <div className="grid grid-cols-1 gap-4">
              {consumptionByRoute.length === 0 ? (
                <EmptyState title="No route telemetry yet" description="Route-level consumption will appear here once telematics data syncs." />
              ) : (
                <ConsumptionChart />
              )}
            </div>
          )}

          {active === 'Predictive' && (
            <div className="grid grid-cols-1 gap-4">
              <BudgetForecast />
              <Card>
                <div className="text-sm font-semibold text-[var(--muted)]">AI Insights</div>
                <div className="mt-3 space-y-2 text-sm">- Idle time in Hub A increased 12% week-over-week.</div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  )
}
