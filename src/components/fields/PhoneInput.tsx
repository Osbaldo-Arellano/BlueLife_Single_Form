import { forwardRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 10)
  if (digits.length === 0) return ''
  if (digits.length <= 3) return `(${digits}`
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}

interface PhoneInputProps {
  id: string
  label: string
  value: string
  error?: string
  disabled?: boolean
  onChange: (formatted: string) => void
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void
}

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ id, label, value, error, disabled, onChange, onBlur }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(formatPhone(e.target.value))
    }

    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={id} className="field-label">
          {label}
        </label>
        <input
          ref={ref}
          id={id}
          name={id}
          type="tel"
          inputMode="numeric"
          value={value}
          onChange={handleChange}
          onBlur={onBlur}
          disabled={disabled}
          autoComplete="tel"
          placeholder="(555) 555-5555"
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`input-field ${error ? 'error' : ''}`}
        />

        <AnimatePresence>
          {error && (
            <motion.p
              id={`${id}-error`}
              role="alert"
              initial={{ opacity: 0, height: 0, y: -4 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -4 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="text-xs text-red-500 font-medium pl-1 overflow-hidden"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    )
  }
)

PhoneInput.displayName = 'PhoneInput'
