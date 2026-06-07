import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Card from '../ui/Card'
import Button from '../ui/Button'
import { useToast } from '../ui/Toast'

export default function SupportForm() {
  const { t } = useTranslation()
  const [type, setType] = useState(t('support.hwFailure'))
  const [asset, setAsset] = useState('')
  const [desc, setDesc] = useState('')
  const [errors, setErrors] = useState({})
  const { addToast } = useToast()

  function validate() {
    const e = {}
    if (!type) e.type = t('support.req')
    if (!asset) e.asset = t('support.req')
    if (!desc) e.desc = t('support.req')
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function submit(e) {
    e.preventDefault()
    if (!validate()) return
    const ticket = `FG-${Math.floor(1000 + Math.random() * 9000)}`
    addToast({ message: t('support.ticketSub', { ticket }), variant: 'success' })
    setType(t('support.hwFailure'))
    setAsset('')
    setDesc('')
  }

  const inputClass = "mt-1.5 w-full rounded-[var(--radius-button)] bg-[var(--bg-primary)] border border-[var(--border-strong)] px-3 py-2 text-[13px] text-[var(--text)] focus:outline-none focus:border-[var(--primary)]/40 focus:ring-1 focus:ring-[var(--primary)]/20 transition-colors"

  return (
    <Card>
      <h3 className="font-display text-lg text-[var(--text)]">{t('support.getInTouch')}</h3>
      <p className="text-sm text-[var(--muted)] mt-1">{t('support.getInTouchDesc')}</p>

      <form onSubmit={submit} className="mt-5 space-y-4">
        <div>
          <label className="block text-xs font-medium text-[var(--muted)] uppercase tracking-wider">{t('support.inquiryType')}</label>
          <select value={type} onChange={(e) => setType(e.target.value)} className={inputClass}>
            <option>{t('support.hwFailure')}</option>
            <option>{t('support.swBug')}</option>
            <option>{t('support.dataIssue')}</option>
            <option>{t('support.general')}</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-[var(--muted)] uppercase tracking-wider">{t('support.vehicleID')}</label>
          <input value={asset} onChange={(e) => setAsset(e.target.value)} placeholder={t('support.vehicleIDPlaceholder')} className={inputClass} />
          {errors.asset && <div className="text-[10px] text-[var(--error)] mt-1">{errors.asset}</div>}
        </div>

        <div>
          <label className="block text-xs font-medium text-[var(--muted)] uppercase tracking-wider">{t('support.probDesc')}</label>
          <textarea value={desc} onChange={(e) => setDesc(e.target.value)} rows={4} className={inputClass} />
          {errors.desc && <div className="text-[10px] text-[var(--error)] mt-1">{errors.desc}</div>}
        </div>

        <div className="pt-1">
          <Button type="submit" variant="primary" size="sm">{t('support.submit')}</Button>
        </div>
      </form>
    </Card>
  )
}
