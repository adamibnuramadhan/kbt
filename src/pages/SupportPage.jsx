import { useTranslation } from 'react-i18next'
import MainLayout from '../components/layout/MainLayout'
import DocGrid from '../components/support/DocGrid'
import FAQAccordion from '../components/support/FAQAccordion'
import SupportForm from '../components/support/SupportForm'

export default function SupportPage() {
  const { t } = useTranslation()

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-3xl">{t('support.title')}</h1>
          <p className="mt-1 text-sm text-[var(--muted)]">{t('support.subtitle')}</p>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-4">
            <DocGrid />

            <FAQAccordion items={t('support.faqs', { returnObjects: true })} />
          </div>

          <div className="col-span-1">
            <SupportForm />
            <div className="mt-4">
              <div className="text-sm text-[var(--muted)]">{t('support.hotline')}</div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
