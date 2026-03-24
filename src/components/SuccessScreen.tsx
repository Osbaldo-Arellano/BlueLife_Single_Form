import { motion } from 'framer-motion'

interface SuccessScreenProps {
  email: string
}

export function SuccessScreen({ email }: SuccessScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.34, 1.1, 0.64, 1] }}
      className="flex flex-col items-center text-center py-8 px-6"
    >
      {/* Animated checkmark */}
      <div className="relative mb-6">
        {/* Glow ring */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.34, 1.2, 0.64, 1], delay: 0.1 }}
          className="w-20 h-20 rounded-full bg-green-50 border-2 border-green-100 flex items-center justify-center"
        />
        {/* SVG checkmark */}
        <svg
          className="absolute inset-0 m-auto"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          aria-hidden="true"
        >
          <motion.path
            d="M8 20 L16 28 L32 12"
            stroke="#22c55e"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: { duration: 0.5, delay: 0.25, ease: 'easeOut' },
              opacity: { duration: 0.1, delay: 0.25 },
            }}
          />
        </svg>
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="text-2xl font-bold text-neutral-900 mb-2"
      >
        Request received!
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
        className="text-sm text-neutral-500 leading-relaxed max-w-xs"
      >
        We'll be in touch at{' '}
        <span className="font-medium text-neutral-700">{email}</span> within
        one business day to discuss your project.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.85 }}
        className="mt-6 text-xs text-neutral-400"
      >
        We look forward to working with you.
      </motion.div>
    </motion.div>
  )
}
