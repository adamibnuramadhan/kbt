import { useEffect, useState } from 'react'
import MainLayout from '../components/layout/MainLayout'
import KPICard from '../components/dashboard/KPICard'
import AlertPanel from '../components/dashboard/AlertPanel'
import FleetMapStatic from '../components/dashboard/FleetMapStatic'
import FuelChart from '../components/dashboard/FuelChart'
import TopVehicles from '../components/dashboard/TopVehicles'
import { kpiData } from '../data/mockData'
import Skeleton from '../components/ui/Skeleton'

function DashboardPage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(t)
  }, [])

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-3xl">Good morning, Pratama</h1>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">System diagnostics are normal. Fleet efficiency up 4.2% this week.</p>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} height={120} />)
          ) : (
            <>
              <KPICard title="TOTAL FUEL USED TODAY" value={`${kpiData.totalFuelToday} L`} unit="Liters" change="-12% less than yesterday" />
              <KPICard title="AVERAGE EFFICIENCY" value={`${kpiData.avgEfficiency} km/l`} unit="km/L" change={`↑ ${kpiData.efficiencyChange} km/l improvement`} />
              <KPICard title="ACTIVE VEHICLES" value={`${kpiData.activeVehicles} / ${kpiData.totalVehicles}`} unit="Units" change={null} />
              <KPICard title="TOTAL SAVINGS (EST.)" value={`Rp ${kpiData.estimatedSavings}M`} unit="" change={kpiData.savingsPeriod} />
            </>
          )}
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">{loading ? <Skeleton height={320} /> : <FleetMapStatic />}</div>
          <div>{loading ? <Skeleton height={320} /> : <AlertPanel />}</div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>{loading ? <Skeleton height={220} /> : <FuelChart />}</div>
          <div>{loading ? <Skeleton height={220} /> : <TopVehicles />}</div>
        </div>
      </div>
    </MainLayout>
  )
}

export default DashboardPage