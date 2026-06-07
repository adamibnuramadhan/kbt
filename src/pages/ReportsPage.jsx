import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import TabNav from '../components/reports/TabNav'
import ConsumptionChart from '../components/reports/ConsumptionChart'
import EfficiencyChart from '../components/reports/EfficiencyChart'
import BudgetForecast from '../components/reports/BudgetForecast'
import Card from '../components/ui/Card'
import EmptyState from '../components/ui/EmptyState'
import MainLayout from '../components/layout/MainLayout'
import { consumptionByRoute } from '../data/mockData'
import useFuelLogStore from '../store/useFuelLogStore'
import useMaintenanceStore from '../store/useMaintenanceStore'
import useFleetStore from '../store/useFleetStore'

// This will be moved inside the component to use 't'
const getTabs = (t) => ['Consumption', 'Efficiency', 'Route', 'Predictive', t('operations.fuelLogs'), t('operations.maintenance')]

const currency = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 })

function formatDate(value) {
  if (!value) return '-'
  return new Intl.DateTimeFormat('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(value))
}

export default function ReportsPage() {
  const [active, setActive] = useState('Consumption')
  const { fuelLogs } = useFuelLogStore()
  const { maintenanceLogs } = useMaintenanceStore()
  const { vehicles } = useFleetStore()
  const { t } = useTranslation()

  const TABS = getTabs(t)

  const vehicleMap = Object.fromEntries(vehicles.map((vehicle) => [vehicle.id, vehicle]))

  const fuelSummary = {
    totalLogs: fuelLogs.length,
    totalLiters: fuelLogs.reduce((sum, log) => sum + Number(log.liters || 0), 0),
    totalCost: fuelLogs.reduce((sum, log) => sum + Number(log.cost || 0), 0),
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <div className="text-2xl font-display">{t('reports.title')}</div>
          <div className="text-sm text-[var(--muted)]">{t('reports.subtitle')}</div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <div className="w-3/4">
              <TabNav tabs={TABS} active={active} onChange={setActive} />
            </div>
            <div className="flex items-center gap-2">
              <button className="rounded bg-[var(--primary)] px-3 py-2 text-sm text-white">{t('reports.exportReport')} (PDF)</button>
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

          {active === t('operations.fuelLogs') && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <Card className="p-4"><div className="text-sm text-[var(--muted)]">Total Logs</div><div className="mt-2 text-2xl font-bold">{fuelSummary.totalLogs}</div></Card>
                <Card className="p-4"><div className="text-sm text-[var(--muted)]">Total Liter</div><div className="mt-2 text-2xl font-bold">{fuelSummary.totalLiters.toFixed(1)} L</div></Card>
                <Card className="p-4"><div className="text-sm text-[var(--muted)]">Total Biaya</div><div className="mt-2 text-2xl font-bold">{currency.format(fuelSummary.totalCost)}</div></Card>
              </div>
              <Card noPadding>
                <div className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)]">
                  <table className="w-full table-auto border-collapse bg-[var(--bg-primary)]">
                    <thead className="text-left text-xs text-[var(--muted)]">
                      <tr>
                        <th className="px-4 py-3">Tanggal</th>
                        <th className="px-4 py-3">Kendaraan</th>
                        <th className="px-4 py-3">Liter</th>
                        <th className="px-4 py-3">Biaya</th>
                        <th className="px-4 py-3">Odometer</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fuelLogs.slice(0, 8).map((log) => (
                        <tr key={log.id} className="border-t border-[var(--border)]">
                          <td className="px-4 py-3 text-sm text-[var(--text-secondary)]">{formatDate(log.date)}</td>
                          <td className="px-4 py-3 text-sm">{log.vehicleId} <span className="text-xs text-[var(--muted)]">{vehicleMap[log.vehicleId]?.plateNumber || ''}</span></td>
                          <td className="px-4 py-3 text-sm font-mono">{Number(log.liters).toFixed(2)} L</td>
                          <td className="px-4 py-3 text-sm font-mono">{currency.format(Number(log.cost) || 0)}</td>
                          <td className="px-4 py-3 text-sm font-mono">{Number(log.odometer).toLocaleString('id-ID')} km</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}

          {active === t('operations.maintenance') && (
            <div className="space-y-4">
              <Card>
                <div className="text-sm font-semibold text-[var(--muted)]">Service Queue</div>
                <div className="mt-3 space-y-2">
                  {maintenanceLogs.filter((log) => log.status === 'Scheduled').slice(0, 5).map((log) => (
                    <div key={log.id} className="flex items-center justify-between rounded-md bg-[var(--bg-hover)] px-3 py-2 text-sm">
                      <div>{log.vehicleId}</div>
                      <div className="font-mono text-[var(--muted)]">{formatDate(log.scheduledDate)}</div>
                    </div>
                  ))}
                  {maintenanceLogs.filter((log) => log.status === 'Scheduled').length === 0 && (
                    <EmptyState title="No upcoming maintenance" description="Scheduled service items will be listed here once entered in Operations." />
                  )}
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  )
}
