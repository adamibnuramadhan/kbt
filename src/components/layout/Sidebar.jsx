import { NavLink, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import useUIStore from '../../store/useUIStore'
import { alerts } from '../../data/mockData'
import Badge from '../ui/Badge'
import Toggle from '../ui/Toggle'

const navItems = [
  { label: 'Overview', path: '/dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1' },
  { label: 'Fleet', path: '/fleet', icon: 'M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0zM13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10M13 16H3m10 0h2l3-6h-4' },
  { label: 'Operations', path: '/operations', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
  { label: 'Reports', path: '/reports', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
  { label: 'Settings', path: '/settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.573-1.066z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
  { label: 'Support', path: '/support', icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
]

function Icon({ d }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor">
      <path d={d} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Sidebar() {
  const sidebarOpen = useUIStore((state) => state.sidebarOpen)
  const toggleSidebar = useUIStore((state) => state.toggleSidebar)
  const setSidebarOpen = useUIStore((state) => state.setSidebarOpen)
  const clearAuthAndLogout = useUIStore((state) => state.clearAuthAndLogout)
  const navSearchQuery = useUIStore((state) => state.navSearchQuery)
  const theme = useUIStore((state) => state.theme)
  const setTheme = useUIStore((state) => state.setTheme)
  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleLogout = () => {
    clearAuthAndLogout()
    navigate('/login')
  }

  const handleNavItemClick = () => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false)
    }
  }

  const filteredNavItems = navItems.filter((item) => item.label.toLowerCase().includes(navSearchQuery.toLowerCase()))

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex flex-col justify-between bg-[var(--bg-card)] transition-all duration-300 md:sticky md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      style={{ width: sidebarOpen ? 248 : 72, borderRight: '1px solid var(--border)' }}
    >
      <div>
        <div className="px-5 py-6">
          {sidebarOpen ? (
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--primary)] text-xs font-bold text-white">F</div>
              <div>
                <p className="font-display text-sm text-[var(--text)]">FuelGuard</p>
                <p className="text-[10px] tracking-widest text-[var(--muted)]">{t('sidebar.monitoring')}</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--primary)] text-xs font-bold text-white">F</div>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
          className="absolute right-[-12px] top-5 z-20 flex h-6 w-6 items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--bg-card)] text-[var(--muted)] transition-colors hover:text-[var(--text-secondary)]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-3 w-3 transform transition-transform ${sidebarOpen ? '' : 'rotate-180'}`} viewBox="0 0 20 20" fill="currentColor">
            <path d="M7.05 4.05a.5.5 0 01.7 0l5.2 5.2a.5.5 0 010 .7l-5.2 5.2a.5.5 0 11-.7-.7L11.29 10 7.05 5.75a.5.5 0 010-.7z" />
          </svg>
        </button>

        {sidebarOpen && (
          <div className="mb-2 px-4">
            <p className="px-2 text-[10px] font-medium uppercase tracking-wider text-[var(--muted)]">{t('sidebar.navigation')}</p>
          </div>
        )}

        <nav className="flex flex-col gap-0.5 px-3">
          {filteredNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={handleNavItemClick}
              title={!sidebarOpen ? t(`sidebar.${item.label.toLowerCase()}`) : undefined}
              className={({ isActive }) =>
                `group relative flex items-center rounded-lg px-3 py-2 text-[13px] transition-all duration-150 ${
                  sidebarOpen ? 'justify-start gap-3' : 'justify-center'
                } ${isActive
                  ? 'bg-[var(--primary-ghost)] text-[var(--primary)]'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text)]'
                }`
              }
            >
              <span className="inline-flex items-center justify-center shrink-0">
                <Icon d={item.icon} />
              </span>
              {sidebarOpen && <span className="flex-1 font-medium">{t(`sidebar.${item.label.toLowerCase()}`)}</span>}
              {item.label === 'Fleet' && alerts.length > 0 && (
                sidebarOpen ? (
                  <Badge variant="error" size="sm" className="ml-auto">
                    {alerts.length}
                  </Badge>
                ) : (
                  <span className="absolute right-2 top-1.5 h-2 w-2 rounded-full bg-[var(--error)]" />
                )
              )}
              {!sidebarOpen && (
                <span className="pointer-events-none absolute left-full top-1/2 ml-3 hidden -translate-y-1/2 rounded-lg bg-[var(--bg-elevated)] px-2.5 py-1.5 text-xs font-medium text-[var(--text)] shadow-[var(--shadow-float)] group-hover:block whitespace-nowrap z-50">
                  {t(`sidebar.${item.label.toLowerCase()}`)}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
        {filteredNavItems.length === 0 && (
          <div className="px-5 py-3 text-xs text-[var(--muted)]">{t('sidebar.noResults')}</div>
        )}
      </div>

      <div className="px-3 pb-4">
        <div className="mb-2 rounded-lg px-3 py-2.5">
          <div className={`flex items-center ${sidebarOpen ? 'gap-3' : 'justify-center'}`}>
            <Toggle
              checked={theme === 'dark'}
              onChange={(checked) => setTheme(checked ? 'dark' : 'light')}
            />
            {sidebarOpen && (
              <span className="text-xs text-[var(--muted)] select-none cursor-pointer" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                {theme === 'dark' ? t('settings.darkMode') : t('settings.lightMode')}
              </span>
            )}
          </div>
        </div>

        <button
          onClick={handleLogout}
          title={!sidebarOpen ? t('sidebar.logout') : undefined}
          className={`group relative flex w-full items-center rounded-lg px-3 py-2 text-[13px] text-[var(--muted)] transition-colors hover:bg-[var(--error)]/8 hover:text-[var(--error)] ${sidebarOpen ? 'gap-3' : 'justify-center'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {sidebarOpen && <span className="font-medium">{t('sidebar.logout')}</span>}
          {!sidebarOpen && (
            <span className="pointer-events-none absolute left-full bottom-1/2 translate-y-1/2 ml-3 hidden rounded-lg bg-[var(--bg-elevated)] px-2.5 py-1.5 text-xs font-medium text-[var(--text)] shadow-[var(--shadow-float)] group-hover:block whitespace-nowrap z-50">
              {t('sidebar.logout')}
            </span>
          )}
        </button>
      </div>
    </aside>
  )
}

export default Sidebar