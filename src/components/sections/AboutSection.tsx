import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { timeline } from '../../data'
import SectionTitle from '../ui/SectionTitle'
import img from '../../assets/Img.png'

export default function AboutSection() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <section id="about" className="relative py-24 px-6">
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-secondary/6 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <SectionTitle eyebrow="My Story" title="The Journey" subtitle="From curiosity to creation — every line of code tells a story." />

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="glass rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

              <div className="flex items-start gap-4 mb-6">
                <motion.div className="w-16 h-16 rounded-2xl overflow-hidden cursor-pointer flex-shrink-0" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={() => setIsOpen(true)}  >
                  <img src={img} alt="Profile" className="w-full h-full object-cover" />  
                </motion.div>
                <div>
                  <h3 className="font-display font-semibold text-xl text-white">Biswaprakash Sahoo</h3>
                  <p className="text-secondary text-sm font-mono">BCA Student · Odisha, India</p>
                </div>
              </div>

              <p className="text-subtext font-body leading-relaxed mb-6">
                I'm a passionate Full Stack Developer and AI Enthusiast pursuing my Bachelor of Computer Applications.
                My journey began with a simple curiosity about how technology shapes the world, and that curiosity has
                grown into a deep passion for building meaningful digital experiences.
              </p>

              <p className="text-subtext font-body leading-relaxed mb-6">
                I believe in learning by doing — every project is an opportunity to grow, every bug a lesson in
                disguise. My goal is to contribute to impactful software that makes a real difference.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Philosophy', value: 'Build · Learn · Repeat' },
                  { label: 'Focus', value: 'AI + Full Stack' },
                  { label: 'Status', value: 'Open to Internships' },
                  { label: 'Location', value: 'Odisha, India' },
                ].map((item) => (
                  <div key={item.label} className="bg-white/3 rounded-xl p-3 border border-white/5">
                    <p className="text-xs text-subtext font-mono uppercase tracking-wider mb-1">{item.label}</p>
                    <p className="text-white text-sm font-body font-medium">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary/0 via-primary/40 to-primary/0" />

            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                className="relative flex gap-6 pb-10 last:pb-0"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Node */}
                <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-2xl glass border border-primary/30 flex items-center justify-center text-lg">
                  {item.icon}
                </div>

                <div className="pt-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-primary text-sm font-medium">{item.year}</span>
                    <h4 className="font-display font-semibold text-white">{item.title}</h4>
                  </div>
                  <p className="text-subtext font-body text-sm leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-lg p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="relative"
              initial={{
                rotateY: 180,
                scale: 0.4,
                opacity: 0,
              }}
              animate={{
                rotateY: 0,
                scale: 1,
                opacity: 1,
              }}
              exit={{
                rotateY: -180,
                scale: 0.4,
                opacity: 0,
              }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                transformStyle: 'preserve-3d',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="glass rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src={img}
                  alt="Profile"
                  className="w-[400px] h-[500px] object-cover"
                />
              </div>
            
              <button
                onClick={() => setIsOpen(false)}
                className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
