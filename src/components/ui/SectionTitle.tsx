import { motion } from 'framer-motion'

interface Props {
  eyebrow?: string
  title: string
  subtitle?: string
  center?: boolean
}

export default function SectionTitle({ eyebrow, title, subtitle, center = false }: Props) {
  return (
    <motion.div
      className={`mb-16 ${center ? 'text-center' : ''}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {eyebrow && (
        <p className="text-secondary font-mono text-sm tracking-[0.25em] uppercase mb-3 opacity-80">{eyebrow}</p>
      )}
      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-none">
        <span className="gradient-text">{title}</span>
      </h2>
      {subtitle && (
        <p className="mt-4 text-subtext text-lg font-body max-w-2xl leading-relaxed">{subtitle}</p>
      )}
      <div className={`mt-6 h-px w-24 bg-gradient-to-r from-primary to-transparent ${center ? 'mx-auto' : ''}`} />
    </motion.div>
  )
}
