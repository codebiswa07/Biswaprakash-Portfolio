import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { skills } from '../../data'
import SectionTitle from '../ui/SectionTitle'
import type { Skill } from '../../types'

const categories = ['all', 'frontend', 'backend', 'programming', 'database', 'design', 'tools', 'concepts'] as const

export default function SkillsSection() {
  const [active, setActive] = useState<string>('all')
  const [hovered, setHovered] = useState<string | null>(null)

  const filtered = active === 'all' ? skills : skills.filter((s) => s.category === active)

  return (
    <section id="skills" className="relative py-24 px-6">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/6 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <SectionTitle eyebrow="Technology" title="Skills & Stack" subtitle="A diverse ecosystem of technologies I work with to build robust applications." center />

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-body capitalize transition-all ${
                active === cat ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'glass text-subtext hover:text-white hover:border-primary/20'
              }`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Skill Grid */}
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          <AnimatePresence>
            {filtered.map((skill, i) => (
              <SkillCard key={skill.name} skill={skill} index={i} hovered={hovered} setHovered={setHovered} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Central core indicator */}
        <motion.div
          className="mt-16 flex flex-col items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-secondary animate-spin-slow opacity-60" />
            <div className="absolute inset-1 rounded-full bg-bg flex items-center justify-center text-2xl">⚡</div>
          </div>
          <p className="text-subtext text-sm font-mono">Innovation Core</p>
          <p className="text-white font-display text-lg">{filtered.length} Technologies</p>
        </motion.div>
      </div>
    </section>
  )
}

function SkillCard({ skill, index, hovered, setHovered }: { skill: Skill; index: number; hovered: string | null; setHovered: (n: string | null) => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.4, delay: index * 0.03, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, scale: 1.05 }}
      onHoverStart={() => setHovered(skill.name)}
      onHoverEnd={() => setHovered(null)}
      className="relative glass rounded-2xl p-4 flex flex-col items-center gap-2 cursor-default group"
      style={{
        borderColor: hovered === skill.name ? skill.color + '55' : 'rgba(255,255,255,0.06)',
        boxShadow: hovered === skill.name ? `0 0 20px ${skill.color}25` : 'none',
      }}
    >
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold"
        style={{ background: skill.color + '22', color: skill.color }}
      >
        {skill.name.slice(0, 2).toUpperCase()}
      </div>
      <span className="text-xs font-body text-center text-subtext group-hover:text-white transition-colors leading-tight">
        {skill.name}
      </span>
      {hovered === skill.name && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded-lg text-xs font-mono whitespace-nowrap z-10"
          style={{ background: skill.color + 'dd', color: '#fff' }}
        >
          {skill.category}
        </motion.div>
      )}
    </motion.div>
  )
}
