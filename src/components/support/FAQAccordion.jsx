import React, { useState } from 'react'
import Card from '../ui/Card'

export default function FAQAccordion({ items = [] }) {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <div className="space-y-3">
      <div className="text-sm font-semibold uppercase text-[var(--muted)]">FREQUENTLY ASKED QUESTIONS</div>
      <div className="space-y-2">
        {items.map((it, idx) => (
          <Card key={idx} className="p-3" hover>
            <button onClick={() => setOpenIndex(openIndex === idx ? null : idx)} className="w-full text-left">
              <div className="flex items-center justify-between">
                <div className="font-medium">{it.question}</div>
                <div className="text-sm text-[var(--muted)]">{openIndex === idx ? '−' : '+'}</div>
              </div>
            </button>
            {openIndex === idx && <div className="mt-2 text-sm text-[var(--text-secondary)]">{it.answer}</div>}
          </Card>
        ))}
      </div>
    </div>
  )
}

