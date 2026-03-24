import { forwardRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { roleOptions } from '../../lib/schema'

interface SelectFieldProps {
  id: string
  label: string
  value: string
  error?: string
  disabled?: boolean
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  onBlur: (e: React.FocusEvent<HTMLSelectElement>) => void
}

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ id, label, value, error, disabled, onChange, onBlur }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={id} className="field-label">
          {label}
        </label>
        <div className="relative">
          <select
            ref={ref}
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
            className={`input-field select-field pr-10 ${error ? 'error' : ''}`}
            style={{ color: value ? '#171717' : '#a3a3a3' }}
          >
            {roleOptions.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.value === ''} style={{ color: '#171717' }}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* Custom chevron */}
          <svg
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M4 6l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

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

SelectField.displayName = 'SelectField'
