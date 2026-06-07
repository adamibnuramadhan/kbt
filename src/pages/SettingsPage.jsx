import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
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
  const language = useUIStore((s) => s.language)
  const setLanguage = useUIStore((s) => s.setLanguage)
  const { t, i18n } = useTranslation()

  const translatedMenu = MENU.map(m => ({ ...m, label: t(`settings.menu.${m.key}`) }))

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
              <h3 className="font-display text-sm text-[var(--text)]">{t('settings.title')}</h3>
              <p className="text-xs text-[var(--muted)] mt-1">{t('settings.subtitle')}</p>
            </div>
            <div className="p-4 pt-0">
              <SettingsMenu items={translatedMenu} active={active} onSelect={setActive} />
            </div>
          </Card>
        </div>

        <div className="lg:col-span-4">
          <div className="space-y-4">
            {active === 'account' && (
              <Card>
                <div>
                  <h2 className="font-display text-lg text-[var(--text)]">{t('settings.accountPrefs')}</h2>
                  <p className="text-sm text-[var(--muted)] mt-1">{t('settings.accountPrefsDesc')}</p>
                </div>
                <div className="mt-5"><ProfileForm /></div>
              </Card>
            )}

            {active === 'notifications' && (
              <Card>
                <h2 className="font-display text-lg text-[var(--text)]">{t('settings.notifSettings')}</h2>
                <div className="mt-5 space-y-4">
                  <div className="flex items-center justify-between"><div className="text-[13px] text-[var(--text-secondary)]">{t('settings.notifLowFuel')}</div><Toggle checked={notifToggles.lowFuel} onChange={() => toggleNotif('lowFuel')} /></div>
                  <div className="flex items-center justify-between"><div className="text-[13px] text-[var(--text-secondary)]">{t('settings.notifUnauthorized')}</div><Toggle checked={notifToggles.unauthorized} onChange={() => toggleNotif('unauthorized')} /></div>
                  <div className="flex items-center justify-between"><div className="text-[13px] text-[var(--text-secondary)]">{t('settings.notifWeekly')}</div><Toggle checked={notifToggles.weeklyReport} onChange={() => toggleNotif('weeklyReport')} /></div>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2" style={{ borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
                  <div>
                    <div className="text-xs font-medium text-[var(--muted)] uppercase tracking-wider">{t('settings.interfaceTheme')}</div>
                    <div className="mt-2"><Toggle checked={darkMode} onChange={handleThemeChange} label={darkMode ? t('settings.darkMode') : t('settings.lightMode')} /></div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-[var(--muted)] uppercase tracking-wider">{t('settings.telemetryRefresh')}</div>
                    <select className="mt-2 w-full rounded-[var(--radius-button)] bg-[var(--bg-primary)] border border-[var(--border-strong)] px-3 py-2 text-[13px] text-[var(--text)] focus:outline-none focus:border-[var(--primary)]/40">
                      <option>{t('settings.telemetryStandard')}</option>
                      <option>{t('settings.telemetryFast')}</option>
                      <option>{t('settings.telemetrySlow')}</option>
                    </select>
                  </div>
                </div>
              </Card>
            )}

            {active === 'users' && (
              <Card>
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-lg text-[var(--text)]">{t('settings.userMgmt')}</h2>
                  <button className="rounded-[var(--radius-button)] border border-[var(--border-strong)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] transition-colors">{t('settings.addOperator')}</button>
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
                <h2 className="font-display text-lg text-[var(--text)]">{t('settings.vehicleSettings')}</h2>
                <p className="mt-1 text-sm text-[var(--muted)]">{t('settings.vehicleSettingsDesc')}</p>
                <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
                  <div className="rounded-lg bg-[var(--bg-primary)] p-4">
                    <div className="text-[13px] font-medium text-[var(--text)]">{t('settings.capSecure')}</div>
                    <div className="mt-1 text-xs text-[var(--muted)]">{t('settings.status')}: <span className="text-[var(--success)]">{t('settings.calibrated')}</span> · {t('settings.calibrated').includes('Kalibrasi') ? 'Versi v2.4.1-G' : 'Ver v2.4.1-G'}</div>
                  </div>
                  <div className="rounded-lg bg-[var(--bg-primary)] p-4">
                    <div className="text-[13px] font-medium text-[var(--text)]">{t('settings.gpsMesh')}</div>
                    <div className="mt-1 text-xs text-[var(--muted)]">{t('settings.signalStrength')}</div>
                  </div>
                </div>
              </Card>
            )}

            {active === 'appearance' && (
              <Card>
                <h2 className="font-display text-lg text-[var(--text)]">{t('settings.appearance')}</h2>
                <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
                  <div>
                    <div className="text-xs font-medium text-[var(--muted)] uppercase tracking-wider">{t('settings.theme')}</div>
                    <div className="mt-2"><Toggle checked={darkMode} onChange={handleThemeChange} label={darkMode ? t('settings.darkMode') : t('settings.lightMode')} /></div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-[var(--muted)] uppercase tracking-wider">{t('settings.sidebarWidth')}</div>
                    <select className="mt-2 w-full rounded-[var(--radius-button)] bg-[var(--bg-primary)] border border-[var(--border-strong)] px-3 py-2 text-[13px] text-[var(--text)] focus:outline-none focus:border-[var(--primary)]/40">
                      <option>{t('settings.widthDefault')}</option>
                      <option>{t('settings.widthSmall')}</option>
                      <option>{t('settings.widthLarge')}</option>
                    </select>
                  </div>
                </div>
                <div className="mt-5">
                  <div className="text-xs font-medium text-[var(--muted)] uppercase tracking-wider">{t('settings.language')}</div>
                  <select 
                    value={language}
                    onChange={(e) => {
                      const newLang = e.target.value
                      setLanguage(newLang)
                      i18n.changeLanguage(newLang)
                    }}
                    className="mt-2 w-48 rounded-[var(--radius-button)] bg-[var(--bg-primary)] border border-[var(--border-strong)] px-3 py-2 text-[13px] text-[var(--text)] focus:outline-none focus:border-[var(--primary)]/40"
                  >
                    <option value="id">Bahasa Indonesia</option>
                    <option value="en">English</option>
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
