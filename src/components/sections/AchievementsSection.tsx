import { motion } from 'framer-motion'
import { Lock, CheckCircle } from 'lucide-react'
import { achievements } from '../../data'
import SectionTitle from '../ui/SectionTitle'

export default function AchievementsSection() {
  return (
    <section id="achievements" className="relative py-24 px-6">
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-accent/6 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <SectionTitle eyebrow="Milestones" title="Achievements" subtitle="Collected badges on the journey — more to be unlocked." center />

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {achievements.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className={`relative glass rounded-2xl p-5 overflow-hidden ${!a.unlocked ? 'opacity-50' : ''}`}
            >
              {a.unlocked && (
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
              )}

              <div className="flex items-start justify-between mb-3">
                <span className="text-3xl">{a.icon}</span>
                {a.unlocked
                  ? <CheckCircle size={16} className="text-green-400" />
                  : <Lock size={14} className="text-subtext" />
                }
              </div>

              <h4 className="font-display font-semibold text-white text-sm mb-1">{a.title}</h4>
              <p className="text-subtext font-body text-xs leading-relaxed">{a.description}</p>

              {!a.unlocked && (
                <div className="mt-3 text-xs font-mono text-subtext/60 flex items-center gap-1">
                  <Lock size={10} /> Coming soon...
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-center text-subtext font-mono text-sm mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          More achievements unlocking soon... 🔓
        </motion.p>
      </div>
    </section>
  )
}
