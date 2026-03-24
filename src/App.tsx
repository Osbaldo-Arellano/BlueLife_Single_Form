import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { HeroSection } from './components/HeroSection'
import { InterestForm } from './components/InterestForm'
import { SuccessScreen } from './components/SuccessScreen'

export default function App() {
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null)

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <HeroSection />

        <AnimatePresence mode="wait">
          {submittedEmail === null ? (
            <InterestForm
              key="form"
              onSuccess={(email) => setSubmittedEmail(email)}
            />
          ) : (
            <div
              key="success"
              className="w-full bg-white rounded-2xl border border-neutral-200"
              style={{ boxShadow: 'var(--shadow-card)' }}
            >
              <SuccessScreen email={submittedEmail} />
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
