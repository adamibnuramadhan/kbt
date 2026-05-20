import React from 'react'
import Card from '../ui/Card'

const docs = [
  { icon: '📖', title: 'Technical Documentation', desc: 'Deep dive into sensor configurations and hardware specs.' },
  { icon: '🎬', title: 'Video Tutorials', desc: 'Step-by-step visual guides for system setup.' },
  { icon: '🔌', title: 'API Reference', desc: 'Integration guide for third-party ERP systems.' },
  { icon: '📋', title: 'Changelog', desc: "Latest firmware and software updates." },
]

export default function DocGrid() {
  return (
    <div className="grid grid-cols-2 gap-4">
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

