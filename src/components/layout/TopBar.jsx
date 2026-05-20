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
    '/reports': 'Reports',
    '/settings': 'Settings',
    '/support': 'Support',
    '/login': 'Login',
  }
  const currentLabel = breadcrumbMap[location.pathname] || 'Dashboard'

  return (
    <>
      <header className="flex h-16 items-center justify-between border-b border-[var(--border)] bg-[var(--bg-card)] px-4 md:px-6">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar on mobile"
            className="rounded-md bg-[var(--bg-hover)] p-2 text-[var(--text-secondary)] md:hidden"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M4 6h16M4 12h16M4 18h16" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="text-sm text-[var(--muted)]">Home › <span className="text-[var(--text)]">{currentLabel}</span></div>
          <div className="w-full max-w-[360px]">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
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
                placeholder="Search fleet or reports..."
                className="w-full rounded-md border border-[var(--border)] bg-[var(--bg-primary)] px-10 py-2 text-sm text-[var(--text)] placeholder:text-[var(--muted)] focus:border-[var(--primary)] focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="ml-6 flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 md:flex">
              <div className="flex items-center gap-2 rounded-full bg-[var(--success)]/10 px-3 py-1">
                <span className="h-2 w-2 rounded-full bg-[var(--success)] animate-pulse" />
                <span className="text-sm font-medium text-[var(--success)]">ALL SYSTEMS OPERATIONAL</span>
              </div>
            </div>

            <button
              onClick={toggleNotifPanel}
              aria-label="Notifications"
              className="relative rounded-md bg-[var(--bg-hover)] p-2 text-[var(--text-secondary)] hover:text-white"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h11z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {unread > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[var(--error)] px-1.5 text-xs text-white">{unread}</span>
              )}
            </button>

            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--primary)] text-xs font-semibold text-white">AR</div>
              <div className="text-right">
                <p className="text-sm text-[var(--text)]">Alex Rivera</p>
                <p className="text-xs text-[var(--muted)]">Fleet Manager</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Notification panel drawer */}
      {notifOpen && (
        <>
          <button type="button" aria-label="Close notifications" onClick={toggleNotifPanel} className="fixed inset-0 top-16 z-30 bg-black/35 backdrop-blur-[2px] md:hidden" />
          <aside className="fixed right-0 top-16 z-40 h-[calc(100vh-64px)] w-full max-w-sm divide-y divide-[var(--border)] overflow-y-auto border-l border-[var(--border)] bg-[var(--bg-card)] shadow-2xl">
            <div className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-lg">Notification Center</h3>
                  <p className="mt-1 text-sm text-[var(--muted)]">{alerts.length} active alerts from the fleet.</p>
                </div>
                <button onClick={toggleNotifPanel} className="rounded-md bg-[var(--bg-hover)] px-3 py-1.5 text-sm text-[var(--muted)]">Close</button>
              </div>
              <div className="mt-3 flex items-center gap-2">
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
                  <div key={a.id} className="flex items-start gap-3 px-4 py-3 hover:bg-[var(--bg-hover)]">
                    <div className={`mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md ${a.severity === 'critical' ? 'bg-[var(--error)]/15 text-[var(--error)]' : a.severity === 'warning' ? 'bg-[var(--warning)]/15 text-[var(--warning)]' : 'bg-[var(--info)]/15 text-[var(--info)]'}`}>
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M12 9v4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="12" cy="16" r="1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-sm font-medium text-[var(--text)]">{a.title}</p>
                        <span className="shrink-0 text-xs text-[var(--muted)]">{a.timestamp}</span>
                      </div>
                      <p className="mt-1 text-xs text-[var(--text-secondary)]">{a.description}</p>
                      <div className="mt-2">
                        <Badge variant={a.severity === 'critical' ? 'error' : a.severity === 'warning' ? 'warning' : 'info'} size="sm">
                          {a.severity}
                        </Badge>
                      </div>
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