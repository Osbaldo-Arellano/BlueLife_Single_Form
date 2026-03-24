import { AnimatePresence, motion } from 'framer-motion'

interface SubmitButtonProps {
  isLoading: boolean
  disabled?: boolean
}

export function SubmitButton({ isLoading, disabled }: SubmitButtonProps) {
  return (
    <motion.button
      type="submit"
      disabled={disabled || isLoading}
      whileHover={!disabled && !isLoading ? { y: -1, boxShadow: '0 8px 24px rgba(99,102,241,0.35)' } : {}}
      whileTap={!disabled && !isLoading ? { scale: 0.97 } : {}}
      transition={{ duration: 0.15 }}
      className="relative w-full py-3.5 px-6 rounded-xl text-sm font-semibold text-white cursor-pointer
                 bg-brand-500 hover:bg-brand-600
                 disabled:opacity-60 disabled:cursor-not-allowed
                 transition-colors duration-150
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
      style={{ minHeight: '52px' }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isLoading ? (
          <motion.span
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex items-center justify-center gap-2"
          >
            <svg
              className="animate-spin h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            <span>Joining...</span>
          </motion.span>
        ) : (
          <motion.span
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            Request a Quote &rarr;
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
