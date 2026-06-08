import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import useUIStore from '../../store/useUIStore'
import { alerts } from '../../data/mockData'
import Badge from '../ui/Badge'

function TopBar() {
  const [query, setQuery] = useState('')
  const location = useLocation()
  const notifOpen = useUIStore((s) => s.notifPanelOpen)
  const toggleNotifPanel = useUIStore((s) => s.toggleNotifPanel)
  const toggleSidebar = useUIStore((s) => s.toggleSidebar)
  const setNavSearchQuery = useUIStore((s) => s.setNavSearchQuery)
  const unread = alerts.length
  const breadcrumbMap = {
    '/dashboard': 'Overview',
    '/fleet': 'Fleet',
    '/operations': 'Operations',
    '/reports': 'Reports',
    '/settings': 'Settings',
    '/support': 'Support',
    '/login': 'Login',
  }
  const currentLabel = breadcrumbMap[location.pathname] || 'Dashboard'

  return (
    <>
      <header className="flex h-14 items-center justify-between border-b border-[var(--border)] bg-[var(--bg-card)] px-6">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar on mobile"
            className="rounded-lg p-1.5 text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] md:hidden"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M4 6h16M4 12h16M4 18h16" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="hidden sm:block text-[13px] text-[var(--muted)]">
            <span>Home</span>
            <span className="mx-1.5 text-[var(--border-strong)]">/</span>
            <span className="text-[var(--text)] font-medium">{currentLabel}</span>
          </div>
          <div className="hidden sm:block w-full max-w-[320px]">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--muted)]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M21 21l-4.35-4.35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="11" cy="11" r="6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setNavSearchQuery(e.target.value)
                }}
                type="text"
                placeholder="Search..."
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] px-9 py-1.5 text-[13px] text-[var(--text)] placeholder:text-[var(--muted)] focus:border-[var(--primary)]/40 focus:outline-none focus:ring-1 focus:ring-[var(--primary)]/20 transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-1.5 md:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--success)]" />
            <span className="text-xs text-[var(--muted)]">All systems operational</span>
          </div>

          <div className="h-4 w-px bg-[var(--border)]" />

          <button
            onClick={toggleNotifPanel}
            aria-label="Notifications"
            className="relative rounded-lg p-2 text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] transition-colors"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h11z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {unread > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[var(--error)] px-1 text-[9px] font-medium text-white">{unread}</span>
            )}
          </button>

          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--primary-ghost)] text-[10px] font-semibold text-[var(--primary)]">AR</div>
            <div className="hidden md:block text-right">
              <p className="text-[13px] font-medium text-[var(--text)]">Alex Rivera</p>
              <p className="text-[10px] text-[var(--muted)]">Fleet Manager</p>
            </div>
          </div>
        </div>
      </header>

      {/* Notification panel drawer */}
      {notifOpen && (
        <>
          <button type="button" aria-label="Close notifications" onClick={toggleNotifPanel} className="fixed inset-0 top-14 z-30 bg-black/30 backdrop-blur-[2px]" />
          <aside className="fixed right-0 top-14 z-40 h-[calc(100vh-56px)] w-full max-w-sm overflow-y-auto bg-[var(--bg-card)] shadow-[var(--shadow-float)]" style={{ borderLeft: '1px solid var(--border)' }}>
            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-base text-[var(--text)]">Notifications</h3>
                  <p className="mt-1 text-xs text-[var(--muted)]">{alerts.length} active alerts</p>
                </div>
                <button onClick={toggleNotifPanel} className="rounded-lg px-2.5 py-1 text-xs text-[var(--muted)] hover:bg-[var(--bg-hover)] transition-colors">Close</button>
              </div>
              <div className="mt-3 flex items-center gap-1.5">
                <Badge variant="error" size="sm">{alerts.filter((a) => a.severity === 'critical').length} critical</Badge>
                <Badge variant="warning" size="sm">{alerts.filter((a) => a.severity === 'warning').length} warning</Badge>
                <Badge variant="info" size="sm">{alerts.filter((a) => a.severity === 'info').length} info</Badge>
              </div>
            </div>
            <div>
              {alerts.length === 0 ? (
                <div className="p-6 text-sm text-[var(--muted)]">No notifications right now.</div>
              ) : (
                alerts.map((a) => (
                  <div key={a.id} className="flex items-start gap-3 px-5 py-3 hover:bg-[var(--bg-hover)] transition-colors" style={{ borderTop: '1px solid var(--border)' }}>
                    <div className={`mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg ${a.severity === 'critical' ? 'bg-[var(--error)]/10 text-[var(--error)]' : a.severity === 'warning' ? 'bg-[var(--warning)]/10 text-[var(--warning)]' : 'bg-[var(--info)]/10 text-[var(--info)]'}`}>
                      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M12 9v4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="12" cy="16" r="0.5" fill="currentColor" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-[13px] font-medium text-[var(--text)]">{a.title}</p>
                        <span className="shrink-0 text-[10px] text-[var(--muted)]">{a.timestamp}</span>
                      </div>
                      <p className="mt-0.5 text-xs text-[var(--text-secondary)] leading-relaxed">{a.description}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </aside>
        </>
      )}
    </>
  )
}

export default TopBar