import { NavLink, useNavigate } from 'react-router-dom'
import useUIStore from '../../store/useUIStore'
import { alerts } from '../../data/mockData'
import Badge from '../ui/Badge'

const navItems = [
  { label: 'Overview', path: '/dashboard', icon: 'M3 3h6v6H3z' },
  { label: 'Fleet', path: '/fleet', icon: 'M3 10h18v7H3z' },
  { label: 'Reports', path: '/reports', icon: 'M3 3h18v4H3z' },
  { label: 'Settings', path: '/settings', icon: 'M12 3v3' },
  { label: 'Support', path: '/support', icon: 'M12 2a10 10 0 100 20 10 10 0 000-20z' },
]

function Icon({ d }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor">
      <path d={d} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Sidebar() {
  const sidebarOpen = useUIStore((state) => state.sidebarOpen)
  const toggleSidebar = useUIStore((state) => state.toggleSidebar)
  const clearAuthAndLogout = useUIStore((state) => state.clearAuthAndLogout)
  const navSearchQuery = useUIStore((state) => state.navSearchQuery)
  const navigate = useNavigate()

  const handleLogout = () => {
    clearAuthAndLogout()
    navigate('/login')
  }

  const filteredNavItems = navItems.filter((item) => item.label.toLowerCase().includes(navSearchQuery.toLowerCase()))

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex flex-col justify-between border-r border-[var(--border)] bg-[var(--bg-card)] transition-all duration-300 md:sticky md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      style={{ width: sidebarOpen ? 256 : 80 }}
    >
      <div>
        <div className="border-b border-[var(--border)] px-4 py-5">
          {sidebarOpen ? (
            <>
              <p className="font-display text-lg font-bold text-[var(--primary)]">FuelGuard</p>
              <p className="text-[9px] uppercase tracking-widest text-[var(--muted)]">FUEL MONITORING SYSTEM</p>
            </>
          ) : (
            <div className="flex items-center justify-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--primary)] text-sm font-bold text-white">FG</div>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
          className="absolute right-[-12px] top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-secondary)] shadow"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transform ${sidebarOpen ? '' : 'rotate-180'}`} viewBox="0 0 20 20" fill="currentColor">
            <path d="M7.05 4.05a.5.5 0 01.7 0l5.2 5.2a.5.5 0 010 .7l-5.2 5.2a.5.5 0 11-.7-.7L11.29 10 7.05 5.75a.5.5 0 010-.7z" />
          </svg>
        </button>

        <nav className="mt-3 flex flex-col gap-1 px-2">
          {filteredNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              title={!sidebarOpen ? item.label : undefined}
              className={({ isActive }) =>
                `group relative flex items-center rounded-md px-3 py-2 text-sm transition-colors duration-150 ${
                  sidebarOpen ? 'justify-start gap-3' : 'justify-center'
                } ${isActive ? 'bg-[var(--primary)] text-white' : 'text-[var(--muted)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-secondary)]'}`
              }
            >
              <span className="inline-flex items-center justify-center text-[var(--primary)]">
                <Icon d={item.icon} />
              </span>
              {sidebarOpen && <span className="flex-1">{item.label}</span>}
              {item.label === 'Fleet' && alerts.length > 0 && (
                sidebarOpen ? (
                  <Badge variant="error" size="sm" className="ml-auto whitespace-nowrap">
                    {alerts.length} alerts
                  </Badge>
                ) : (
                  <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-[var(--error)] ring-2 ring-[var(--bg-card)]" />
                )
              )}
              {!sidebarOpen && (
                <span className="pointer-events-none absolute left-full top-1/2 ml-2 hidden -translate-y-1/2 rounded-md border border-[var(--border)] bg-[var(--bg-card)] px-2 py-1 text-xs text-[var(--text-secondary)] shadow-lg group-hover:block">
                  {item.label}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
        {filteredNavItems.length === 0 && (
          <div className="px-4 py-3 text-sm text-[var(--muted)]">No navigation items match your search</div>
        )}
      </div>

      <div className="sticky bottom-0 w-full">
        <button
          onClick={handleLogout}
          title={!sidebarOpen ? 'Logout' : undefined}
          className="group relative m-3 flex w-auto items-center gap-3 rounded-md px-3 py-2 text-sm text-[var(--muted)] hover:bg-[var(--bg-hover)]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M16 17l5-5m0 0l-5-5m5 5H9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9 19H5a2 2 0 01-2-2V7a2 2 0 012-2h4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {sidebarOpen && <span>Logout</span>}
          {!sidebarOpen && (
            <span className="pointer-events-none absolute left-full bottom-3 ml-2 hidden rounded-md border border-[var(--border)] bg-[var(--bg-card)] px-2 py-1 text-xs text-[var(--text-secondary)] shadow-lg group-hover:block">
              Logout
            </span>
          )}
        </button>
      </div>
    </aside>
  )
}

export default Sidebar