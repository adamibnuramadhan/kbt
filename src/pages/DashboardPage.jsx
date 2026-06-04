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
    const t = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(t)
  }, [])

  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="font-display text-2xl text-[var(--text)]">Good morning, Pratama</h1>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">System diagnostics are normal. Fleet efficiency up 4.2% this week.</p>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} height={130} />)
          ) : (
            <>
              <KPICard title="TOTAL FUEL USED TODAY" value={`${kpiData.totalFuelToday} L`} unit="Liters" change="-12% vs yesterday" />
              <KPICard title="AVERAGE EFFICIENCY" value={`${kpiData.avgEfficiency} km/l`} unit="km/L" change={`↑ ${kpiData.efficiencyChange} km/l`} />
              <KPICard title="ACTIVE VEHICLES" value={`${kpiData.activeVehicles}/${kpiData.totalVehicles}`} unit="Units" change={null} />
              <KPICard title="EST. SAVINGS" value={`Rp ${kpiData.estimatedSavings}M`} unit="" change={kpiData.savingsPeriod} />
            </>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2">{loading ? <Skeleton height={340} /> : <FleetMapStatic />}</div>
          <div>{loading ? <Skeleton height={340} /> : <AlertPanel />}</div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div>{loading ? <Skeleton height={280} /> : <FuelChart />}</div>
          <div>{loading ? <Skeleton height={280} /> : <TopVehicles />}</div>
        </div>
      </div>
    </MainLayout>
  )
}

export default DashboardPage