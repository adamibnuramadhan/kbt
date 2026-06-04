import { useState } from 'react'
import MainLayout from '../components/layout/MainLayout'
import SettingsMenu from '../components/settings/SettingsMenu'
import ProfileForm from '../components/settings/ProfileForm'
import UserCard from '../components/settings/UserCard'
import Toggle from '../components/ui/Toggle'
import Card from '../components/ui/Card'
import useUIStore from '../store/useUIStore'
import { users as mockUsers } from '../data/mockData'

const MENU = [
  { key: 'account', label: 'Account', icon: '👤' },
  { key: 'notifications', label: 'Notifications', icon: '🔔' },
  { key: 'users', label: 'Users', icon: '👥' },
  { key: 'vehicles', label: 'Vehicles', icon: '🚚' },
  { key: 'appearance', label: 'Appearance', icon: '🎨' },
]

export default function SettingsPage() {
  const [active, setActive] = useState('account')
  const [notifToggles, setNotifToggles] = useState({ lowFuel: true, unauthorized: true, weeklyReport: false })
  const [darkMode, setDarkMode] = useState(useUIStore.getState().theme === 'dark')
  const setTheme = useUIStore((s) => s.setTheme)

  function toggleNotif(k) {
    setNotifToggles((s) => ({ ...s, [k]: !s[k] }))
  }

  function handleThemeChange(v) {
    setDarkMode(v)
    setTheme(v ? 'dark' : 'light')
  }

  return (
    <MainLayout>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="lg:col-span-1">
          <Card noPadding>
            <div className="p-5">
              <h3 className="font-display text-sm text-[var(--text)]">Settings</h3>
              <p className="text-xs text-[var(--muted)] mt-1">Manage preferences</p>
            </div>
            <div className="p-4 pt-0">
              <SettingsMenu items={MENU} active={active} onSelect={setActive} />
            </div>
          </Card>
        </div>

        <div className="lg:col-span-4">
          <div className="space-y-4">
            {active === 'account' && (
              <Card>
                <div>
                  <h2 className="font-display text-lg text-[var(--text)]">Account Preferences</h2>
                  <p className="text-sm text-[var(--muted)] mt-1">Update profile and company information.</p>
                </div>
                <div className="mt-5"><ProfileForm /></div>
              </Card>
            )}

            {active === 'notifications' && (
              <Card>
                <h2 className="font-display text-lg text-[var(--text)]">Notification Settings</h2>
                <div className="mt-5 space-y-4">
                  <div className="flex items-center justify-between"><div className="text-[13px] text-[var(--text-secondary)]">Critical Low Fuel Warning (&lt;10%)</div><Toggle checked={notifToggles.lowFuel} onChange={() => toggleNotif('lowFuel')} /></div>
                  <div className="flex items-center justify-between"><div className="text-[13px] text-[var(--text-secondary)]">Unauthorized Access Attempt</div><Toggle checked={notifToggles.unauthorized} onChange={() => toggleNotif('unauthorized')} /></div>
                  <div className="flex items-center justify-between"><div className="text-[13px] text-[var(--text-secondary)]">Weekly Efficiency Report</div><Toggle checked={notifToggles.weeklyReport} onChange={() => toggleNotif('weeklyReport')} /></div>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2" style={{ borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
                  <div>
                    <div className="text-xs font-medium text-[var(--muted)] uppercase tracking-wider">Interface Theme</div>
                    <div className="mt-2"><Toggle checked={darkMode} onChange={handleThemeChange} label={darkMode ? 'Dark Mode' : 'Light Mode'} /></div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-[var(--muted)] uppercase tracking-wider">Telemetry Refresh</div>
                    <select className="mt-2 w-full rounded-[var(--radius-button)] bg-[var(--bg-primary)] border border-[var(--border-strong)] px-3 py-2 text-[13px] text-[var(--text)] focus:outline-none focus:border-[var(--primary)]/40">
                      <option>Standard (30 seconds)</option>
                      <option>Fast (10 seconds)</option>
                      <option>Slow (60 seconds)</option>
                    </select>
                  </div>
                </div>
              </Card>
            )}

            {active === 'users' && (
              <Card>
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-lg text-[var(--text)]">User Management</h2>
                  <button className="rounded-[var(--radius-button)] border border-[var(--border-strong)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] transition-colors">+ Add Operator</button>
                </div>
                <div className="mt-5 grid grid-cols-1 gap-3 lg:grid-cols-2">
                  {mockUsers.slice(0, 4).map((u) => (
                    <UserCard key={u.id} user={u} />
                  ))}
                </div>
              </Card>
            )}

            {active === 'vehicles' && (
              <Card>
                <h2 className="font-display text-lg text-[var(--text)]">Vehicle Settings</h2>
                <p className="mt-1 text-sm text-[var(--muted)]">Hardware & sensor calibration, fuel probe settings, and telemetry routing.</p>
                <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
                  <div className="rounded-lg bg-[var(--bg-primary)] p-4">
                    <div className="text-[13px] font-medium text-[var(--text)]">Cap-Secure Sensors</div>
                    <div className="mt-1 text-xs text-[var(--muted)]">Status: <span className="text-[var(--success)]">Calibrated</span> · Ver v2.4.1-G</div>
                  </div>
                  <div className="rounded-lg bg-[var(--bg-primary)] p-4">
                    <div className="text-[13px] font-medium text-[var(--text)]">GPS Mesh Sync</div>
                    <div className="mt-1 text-xs text-[var(--muted)]">Signal Strength 92% · Encryption AES-256</div>
                  </div>
                </div>
              </Card>
            )}

            {active === 'appearance' && (
              <Card>
                <h2 className="font-display text-lg text-[var(--text)]">Appearance</h2>
                <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
                  <div>
                    <div className="text-xs font-medium text-[var(--muted)] uppercase tracking-wider">Theme</div>
                    <div className="mt-2"><Toggle checked={darkMode} onChange={handleThemeChange} label={darkMode ? 'Dark' : 'Light'} /></div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-[var(--muted)] uppercase tracking-wider">Sidebar Width</div>
                    <select className="mt-2 w-full rounded-[var(--radius-button)] bg-[var(--bg-primary)] border border-[var(--border-strong)] px-3 py-2 text-[13px] text-[var(--text)] focus:outline-none focus:border-[var(--primary)]/40">
                      <option>248px (default)</option>
                      <option>200px</option>
                      <option>320px</option>
                    </select>
                  </div>
                </div>
                <div className="mt-5">
                  <div className="text-xs font-medium text-[var(--muted)] uppercase tracking-wider">Language</div>
                  <select className="mt-2 w-48 rounded-[var(--radius-button)] bg-[var(--bg-primary)] border border-[var(--border-strong)] px-3 py-2 text-[13px] text-[var(--text)] focus:outline-none focus:border-[var(--primary)]/40">
                    <option>Bahasa Indonesia</option>
                    <option>English</option>
                  </select>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
