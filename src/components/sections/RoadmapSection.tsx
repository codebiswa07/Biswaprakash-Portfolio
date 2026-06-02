import { motion } from 'framer-motion'
import { GraduationCap, Code, Brain, Rocket, Star } from 'lucide-react'
import SectionTitle from '../ui/SectionTitle'

const stages = [
  { icon: <GraduationCap size={22} />, label: 'Current', title: 'BCA Student', desc: 'Building strong computer science fundamentals while creating real-world projects.', color: '#7C3AED', active: true },
  { icon: <Code size={22} />, label: 'Now', title: 'Full Stack Dev', desc: 'Mastering React, Node.js, Python and modern web architectures.', color: '#06B6D4', active: true },
  { icon: <Brain size={22} />, label: 'Near', title: 'AI Engineer', desc: 'Integrating machine learning and AI into practical applications.', color: '#A855F7', active: false },
  { icon: <Rocket size={22} />, label: 'Future', title: 'Software Engineer', desc: 'Contributing to large-scale systems at impactful tech companies.', color: '#F59E0B', active: false },
  { icon: <Star size={22} />, label: 'Vision', title: 'Product Builder', desc: 'Creating products that solve real problems and reach millions of people.', color: '#10B981', active: false },
]

export default function RoadmapSection() {
  return (
    <section id="roadmap" className="relative py-24 px-6">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <SectionTitle eyebrow="Career Path" title="The Roadmap" subtitle="A clear vision from where I am to where I'm headed." center />

        <div className="relative max-w-4xl mx-auto">
          {/* Connecting line */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 hidden md:block" />

          <div className="grid md:grid-cols-5 gap-6 relative">
            {stages.map((stage, i) => (
              <motion.div
                key={stage.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex flex-col items-center text-center"
              >
                {/* Node */}
                <motion.div
                  className="relative z-10 w-14 h-14 rounded-2xl glass flex items-center justify-center mb-4"
                  style={{ borderColor: stage.color + '44', boxShadow: stage.active ? `0 0 20px ${stage.color}40` : 'none' }}
                  whileHover={{ scale: 1.1, boxShadow: `0 0 30px ${stage.color}60` }}
                >
                  <span style={{ color: stage.color }}>{stage.icon}</span>
                  {stage.active && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-400 border-2 border-bg animate-pulse" />
                  )}
                </motion.div>

                <span className="font-mono text-xs mb-1" style={{ color: stage.color }}>{stage.label}</span>
                <h4 className="font-display font-semibold text-sm text-white mb-2">{stage.title}</h4>
                <p className="text-subtext text-xs font-body leading-relaxed">{stage.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Current focus */}
        <motion.div
          className="mt-16 max-w-3xl mx-auto glass rounded-3xl p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent rounded-t-3xl" />
          <h3 className="font-display font-semibold text-white text-center mb-6">Current Focus Areas</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { emoji: '⚡', title: 'Full Stack Dev', items: ['React + TypeScript', 'Node.js + Express', 'Python backends'] },
              { emoji: '🤖', title: 'AI & ML', items: ['Python + FastAPI', 'OpenAI APIs', 'ML fundamentals'] },
              { emoji: '🌐', title: 'Modern Web', items: ['3D Web (Three.js)', 'Animations (GSAP)', 'Performance'] },
            ].map((focus) => (
              <div key={focus.title} className="bg-white/3 rounded-2xl p-4 border border-white/5">
                <div className="text-2xl mb-2">{focus.emoji}</div>
                <h4 className="font-display font-medium text-white text-sm mb-2">{focus.title}</h4>
                <ul className="space-y-1">
                  {focus.items.map((item) => (
                    <li key={item} className="text-subtext text-xs font-mono flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-primary inline-block" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
