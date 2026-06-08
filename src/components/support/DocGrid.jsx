import { useTranslation } from 'react-i18next'
import Card from '../ui/Card'

const getDocs = (t) => [
  { icon: '📖', title: t('support.docTech'), desc: t('support.docTechDesc') },
  { icon: '🎬', title: t('support.docVideo'), desc: t('support.docVideoDesc') },
  { icon: '🔌', title: t('support.docAPI'), desc: t('support.docAPIDesc') },
  { icon: '📋', title: t('support.docChangelog'), desc: t('support.docChangelogDesc') },
]

export default function DocGrid() {
  const { t } = useTranslation()
  const docs = getDocs(t)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {docs.map((d) => (
        <Card key={d.title} className="hover:shadow-lg" hover>
          <div className="flex items-start gap-4">
            <div className="text-3xl">{d.icon}</div>
            <div>
              <div className="font-medium">{d.title}</div>
              <div className="text-sm text-[var(--muted)] mt-1">{d.desc}</div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

