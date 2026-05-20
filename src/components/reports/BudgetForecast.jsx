import React from 'react'
import Card from '../ui/Card'
import { budgetForecast } from '../../data/mockData'

function formatCurrency(v) {
  return 'Rp ' + v.toLocaleString('id-ID')
}

export default function BudgetForecast() {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold uppercase text-[var(--muted)]">Q4 Budget Forecast</div>
        <div className="text-xs text-[var(--muted)]">AI-driven predictive analysis</div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="space-y-1">
          <div className="text-sm font-medium">October</div>
          <div className="text-lg">{formatCurrency(budgetForecast.october.amount)}</div>
          <div className="text-xs text-[var(--muted)]">{budgetForecast.october.label}</div>
        </div>
        <div className="space-y-1">
          <div className="text-sm font-medium">November</div>
          <div className="text-lg">{formatCurrency(budgetForecast.november.amount)}</div>
          <div className="text-xs text-[var(--muted)]">{budgetForecast.november.label}</div>
        </div>
        <div className="space-y-1">
          <div className="text-sm font-medium">December</div>
          <div className="text-lg">{formatCurrency(budgetForecast.december.amount)}</div>
          <div className="text-xs text-[var(--muted)]">{budgetForecast.december.label}</div>
        </div>
      </div>

      <div className="mt-4 border-t border-[var(--border)] pt-3 text-sm">
        <div>Quarter Total: <strong>{formatCurrency(budgetForecast.quarterTotal)}</strong></div>
        <div className="text-xs text-[var(--muted)]">Est. Savings: {formatCurrency(budgetForecast.estimatedSavings)}</div>
      </div>
    </Card>
  )
}

