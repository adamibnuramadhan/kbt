import { useState } from 'react'
import Modal from '../ui/Modal'

export default function OperationRecordModal({ isOpen, onClose, title, subtitle, fields = [], initialValues = {}, onSave }) {
  const [formData, setFormData] = useState(() => initialValues)

  if (!isOpen) return null

  const handleChange = (event) => {
    const { name, value, type } = event.target
    setFormData((current) => ({
      ...current,
      [name]: type === 'number' ? value.replace(/[^\d.]/g, '') : value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSave(formData)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} subtitle={subtitle} size="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          {fields.map((field) => (
            <div key={field.name} className={field.fullWidth ? 'md:col-span-2' : ''}>
              <label className="mb-1 block text-sm font-medium text-[var(--text-secondary)]">{field.label}</label>
              {field.type === 'select' ? (
                <select
                  name={field.name}
                  value={formData[field.name] ?? ''}
                  onChange={handleChange}
                  required={field.required}
                  className="w-full rounded-md border border-[var(--border)] bg-[var(--bg-primary)] px-3 py-2 text-sm text-[var(--text-primary)] focus:border-[var(--primary)] focus:outline-none"
                >
                  <option value="">Select {field.label}</option>
                  {field.options.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              ) : field.type === 'textarea' ? (
                <textarea
                  name={field.name}
                  value={formData[field.name] ?? ''}
                  onChange={handleChange}
                  rows={field.rows || 4}
                  required={field.required}
                  placeholder={field.placeholder}
                  className="w-full rounded-md border border-[var(--border)] bg-[var(--bg-primary)] px-3 py-2 text-sm text-[var(--text-primary)] focus:border-[var(--primary)] focus:outline-none"
                />
              ) : (
                <input
                  type={field.type || 'text'}
                  name={field.name}
                  value={formData[field.name] ?? ''}
                  onChange={handleChange}
                  required={field.required}
                  placeholder={field.placeholder}
                  min={field.min}
                  step={field.step}
                  className="w-full rounded-md border border-[var(--border)] bg-[var(--bg-primary)] px-3 py-2 text-sm text-[var(--text-primary)] focus:border-[var(--primary)] focus:outline-none"
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3 border-t border-[var(--border)] pt-4">
          <button type="button" onClick={onClose} className="rounded-md border border-[var(--border)] bg-transparent px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]">
            Cancel
          </button>
          <button type="submit" className="rounded-md bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
            Save Changes
          </button>
        </div>
      </form>
    </Modal>
  )
}