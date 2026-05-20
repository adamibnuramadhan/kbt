import React from 'react'
import MainLayout from '../components/layout/MainLayout'
import DocGrid from '../components/support/DocGrid'
import FAQAccordion from '../components/support/FAQAccordion'
import SupportForm from '../components/support/SupportForm'
import { faqItems } from '../data/mockData'

export default function SupportPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-3xl">How can we help you today?</h1>
          <p className="mt-1 text-sm text-[var(--muted)]">Access documentation, submit tickets, or browse our knowledge base for fuel management best practices.</p>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-4">
            <DocGrid />

            <FAQAccordion items={faqItems} />
          </div>

          <div className="col-span-1">
            <SupportForm />
            <div className="mt-4">
              <div className="text-sm text-[var(--muted)]">Average Response 1.5 Hours · 24/7 HOTLINE +1 (800) FUEL-SOS</div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
