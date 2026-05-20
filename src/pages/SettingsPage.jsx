import MainLayout from '../components/layout/MainLayout'

function SettingsPage() {
  return (
    <MainLayout>
      <section className="rounded-lg border border-[var(--border)] bg-[var(--bg-card)] p-6">
        <h1 className="font-display text-2xl text-[var(--text)]">Settings</h1>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          System settings modules akan diisi pada fase berikutnya.
        </p>
      </section>
    </MainLayout>
  )
}

export default SettingsPage