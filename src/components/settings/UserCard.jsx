import React from 'react'
import Badge from '../ui/Badge'

export default function UserCard({ user }) {
  return (
    <div className="flex items-center gap-3 rounded bg-[var(--bg)] border border-[var(--border)] p-3">
      <div className="h-10 w-10 flex items-center justify-center rounded-full bg-[var(--bg-card)] text-sm font-medium">{user.avatar}</div>
      <div className="flex-1">
        <div className="font-medium">{user.name}</div>
        <div className="text-xs text-[var(--muted)]">{user.role} · {user.department}</div>
      </div>
      <div className="flex flex-col items-end gap-1">
        <Badge variant={user.role === 'Admin' ? 'warning' : 'success'}>{user.role}</Badge>
        <div className="text-xs text-[var(--muted)]">{user.lastActive}</div>
      </div>
    </div>
  )
}

