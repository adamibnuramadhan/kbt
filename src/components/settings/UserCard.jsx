import React from 'react'
import Badge from '../ui/Badge'

export default function UserCard({ user }) {
  return (
    <div className="flex items-center gap-3 rounded-[var(--radius-card)] bg-[var(--bg-primary)] p-3.5">
      <div className="h-9 w-9 flex items-center justify-center rounded-full bg-[var(--primary-ghost)] text-xs font-semibold text-[var(--primary)]">{user.avatar}</div>
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-medium text-[var(--text)]">{user.name}</div>
        <div className="text-[10px] text-[var(--muted)]">{user.department}</div>
      </div>
      <div className="flex flex-col items-end gap-1">
        <Badge variant={user.role === 'Admin' ? 'warning' : 'neutral'} size="sm">{user.role}</Badge>
        <div className="text-[10px] text-[var(--muted)]">{user.lastActive}</div>
      </div>
    </div>
  )
}
