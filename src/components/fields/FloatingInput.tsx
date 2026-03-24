import { forwardRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface FloatingInputProps {
  id: string
  label: string
  type?: 'text' | 'email'
  value: string
  error?: string
  disabled?: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void
}

export const FloatingInput = forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ id, label, type = 'text', value, error, disabled, onChange, onBlur }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={id} className="field-label">
          {label}
        </label>
        <input
          ref={ref}
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          autoComplete={type === 'email' ? 'email' : 'name'}
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

FloatingInput.displayName = 'FloatingInput'
