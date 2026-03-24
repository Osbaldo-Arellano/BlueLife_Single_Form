import { motion } from 'framer-motion'

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay },
  }),
}

export function HeroSection() {
  return (
    <div className="text-center mb-10">
      <motion.div
        custom={0}
        initial="hidden"
        animate="visible"
        variants={item}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                   bg-brand-50 border border-brand-100 text-brand-600
                   text-xs font-medium mb-5"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
        Now accepting new clients
      </motion.div>

      <motion.h1
        custom={0.05}
        initial="hidden"
        animate="visible"
        variants={item}
        className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 mb-3"
      >
        Let's work your land.
      </motion.h1>

      <motion.p
        custom={0.12}
        initial="hidden"
        animate="visible"
        variants={item}
        className="text-lg sm:text-xl font-medium text-neutral-700 mb-3"
      >
        Professional agricultural contracting services.
      </motion.p>

      <motion.p
        custom={0.2}
        initial="hidden"
        animate="visible"
        variants={item}
        className="text-sm text-neutral-500 max-w-sm mx-auto leading-relaxed"
      >
        Fill out the form and we'll reach out to discuss your project,
        timeline, and how we can help get the job done right.
      </motion.p>
    </div>
  )
}
