import React, { useState } from 'react'
import MainLayout from '../components/layout/MainLayout'
import SettingsMenu from '../components/settings/SettingsMenu'
import ProfileForm from '../components/settings/ProfileForm'
import UserCard from '../components/settings/UserCard'
import Toggle from '../components/ui/Toggle'
import Card from '../components/ui/Card'
import useUIStore from '../store/useUIStore'
import { users as mockUsers } from '../data/mockData'

const MENU = [
  { key: 'account', label: 'Account Preferences', icon: '👤' },
  { key: 'notifications', label: 'Notification Settings', icon: '🔔' },
  { key: 'users', label: 'User Management', icon: '👥' },
  { key: 'vehicles', label: 'Vehicle Settings', icon: '🚚' },
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
      <div className="grid grid-cols-5 gap-6">
        <div className="col-span-1">
          <Card noPadding>
            <div className="p-4">
              <h3 className="font-medium">System Settings</h3>
              <p className="text-sm text-[var(--muted)] mt-1">Manage your fuel monitoring preferences</p>
            </div>
            <div className="p-4">
              <SettingsMenu items={MENU} active={active} onSelect={setActive} />
            </div>
          </Card>
        </div>

        <div className="col-span-4">
          <div className="space-y-4">
            {active === 'account' && (
              <Card>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-display text-xl">Account Preferences</h2>
                    <p className="text-sm text-[var(--muted)] mt-1">Update profile and company information.</p>
                  </div>
                </div>
                <div className="mt-4"><ProfileForm /></div>
              </Card>
            )}

            {active === 'notifications' && (
              <Card>
                <h2 className="font-display text-xl">Notification Settings</h2>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between"><div className="text-sm">Critical Low Fuel Warning (&lt;10%)</div><Toggle checked={notifToggles.lowFuel} onChange={() => toggleNotif('lowFuel')} /></div>
                  <div className="flex items-center justify-between"><div className="text-sm">Unauthorized Access Attempt</div><Toggle checked={notifToggles.unauthorized} onChange={() => toggleNotif('unauthorized')} /></div>
                  <div className="flex items-center justify-between"><div className="text-sm">Weekly Efficiency Report</div><Toggle checked={notifToggles.weeklyReport} onChange={() => toggleNotif('weeklyReport')} /></div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-[var(--muted)]">Interface Theme</div>
                    <div className="mt-2"><Toggle checked={darkMode} onChange={handleThemeChange} label={darkMode ? 'Dark Mode' : 'Light Mode'} /></div>
                  </div>
                  <div>
                    <div className="text-sm text-[var(--muted)]">Telemetry Refresh</div>
                    <select className="mt-2 w-full rounded bg-[var(--bg)] border border-[var(--border)] px-3 py-2 text-sm text-[var(--text)]">
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
                  <h2 className="font-display text-xl">User Management</h2>
                  <button className="rounded border border-[var(--border)] px-3 py-2 text-sm text-[var(--text-secondary)]">+ Add New Operator</button>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {mockUsers.slice(0, 4).map((u) => (
                    <UserCard key={u.id} user={u} />
                  ))}
                </div>
              </Card>
            )}

            {active === 'vehicles' && (
              <Card>
                <h2 className="font-display text-xl">Vehicle Settings</h2>
                <div className="mt-3 text-sm text-[var(--muted)]">Hardware & sensor calibration, fuel probe settings, and telemetry routing.</div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="space-y-2"><div className="text-sm font-medium">Cap-Secure Sensors</div><div className="text-xs text-[var(--muted)]">Status: <span className="text-[var(--primary)]">Calibrated</span> · Ver v2.4.1-G</div></div>
                  <div className="space-y-2"><div className="text-sm font-medium">GPS Mesh Sync</div><div className="text-xs text-[var(--muted)]">Signal Strength 92% · Encryption AES-256</div></div>
                </div>
              </Card>
            )}

            {active === 'appearance' && (
              <Card>
                <h2 className="font-display text-xl">Appearance</h2>
                <div className="mt-3 grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-[var(--muted)]">Theme</div>
                    <div className="mt-2"><Toggle checked={darkMode} onChange={handleThemeChange} label={darkMode ? 'Dark' : 'Light'} /></div>
                  </div>
                  <div>
                    <div className="text-sm text-[var(--muted)]">Sidebar Width</div>
                    <select className="mt-2 w-full rounded bg-[var(--bg)] border border-[var(--border)] px-3 py-2 text-sm text-[var(--text)]">
                      <option>256px (default)</option>
                      <option>200px</option>
                      <option>320px</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-sm text-[var(--muted)]">Language</div>
                  <select className="mt-2 w-48 rounded bg-[var(--bg)] border border-[var(--border)] px-3 py-2 text-sm text-[var(--text)]">
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
