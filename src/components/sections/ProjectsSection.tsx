import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, X } from 'lucide-react'
import { projects } from '../../data'
import SectionTitle from '../ui/SectionTitle'
import type { Project } from '../../types'

export default function ProjectsSection() {
  const [selected, setSelected] = useState<Project | null>(null)

  return (
    <section id="projects" className="relative py-24 px-6">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/6 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <SectionTitle eyebrow="Portfolio" title="Featured Projects" subtitle="Handcrafted solutions that blend technical depth with thoughtful design." />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} onOpen={setSelected} />
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div className="absolute inset-0 bg-bg/80 backdrop-blur-xl" onClick={() => setSelected(null)} />
            <motion.div
              className="relative glass rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto z-10"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ ease: [0.22, 1, 0.36, 1] }}
            >
              <button onClick={() => setSelected(null)} className="absolute top-6 right-6 text-subtext hover:text-white">
                <X size={20} />
              </button>

              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6"
                style={{ background: selected.color + '22' }}>
                  <img src={selected.logo} alt={selected.logo} className="object-fit" style={{ color: selected.color }} />
              </div>

              <h3 className="font-display font-bold text-2xl text-white mb-2">{selected.title}</h3>
              {/* Demo Image */}
              {selected.image && (
                <div className="relative mb-5 overflow-hidden rounded-2xl border border-white/10">
                  <img
                    src={selected.image}
                    alt={selected.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span
                      className="px-4 py-2 rounded-xl text-sm font-medium text-white"
                      style={{ background: selected.color + "cc" }}
                    >
                      View Project
                    </span>
                  </div>
                </div>
              )}
              <p className="text-subtext font-body leading-relaxed mb-6">{selected.longDescription}</p>

              <div className="flex flex-wrap gap-2 mb-8">
                {selected.stack.map((tech) => (
                  <span key={tech} className="px-3 py-1 rounded-lg text-xs font-mono glass"
                    style={{ color: selected.color }}>{tech}</span>
                ))}
              </div>

              <div className="flex gap-3">
                {selected.demoUrl && (
                  <a href={selected.demoUrl}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-body text-white text-sm font-medium transition-all"
                    style={{ background: selected.color }}>
                    <ExternalLink size={15} /> Live Demo
                  </a>
                )}
                {selected.githubUrl && (
                  <a href={selected.githubUrl}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl glass text-white text-sm font-medium hover:border-white/20 transition-all">
                    <Github size={15} /> View Code
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

function ProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: (p: Project) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group relative glass rounded-3xl p-6 overflow-hidden cursor-pointer"
      style={{ borderColor: project.color + '20' }}
      onClick={() => onOpen(project)}
    >
      {/* Gradient top */}
      <div className="absolute top-0 left-0 right-0 h-px transition-opacity duration-300"
        style={{ background: `linear-gradient(to right, transparent, ${project.color}, transparent)`, opacity: 0.6 }} />

      {/* Glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
        style={{ background: `radial-gradient(circle at 50% 0%, ${project.color}15 0%, transparent 60%)` }} >
        </div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ background: project.color + '18' }}>
            <img src={project.logo} alt={project.title} style={{ color: project.color }} className="w-18 h-18 object-fit" />
          </div>
          {project.featured && (
            <span className="text-xs font-mono px-2 py-1 rounded-lg" style={{ background: project.color + '20', color: project.color }}>
              Featured
            </span>
          )}
        </div>

        <h3 className="font-display font-semibold text-lg text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text transition-all"
          style={{ WebkitTextFillColor: 'inherit' }}>
          {project.title}
        </h3>
        <p className="text-subtext font-body text-sm leading-relaxed mb-5">{project.description}</p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.stack.slice(0, 4).map((tech) => (
            <span key={tech} className="text-xs font-mono px-2 py-1 rounded-lg bg-white/4 text-subtext">{tech}</span>
          ))}
          {project.stack.length > 4 && (
            <span className="text-xs font-mono px-2 py-1 rounded-lg bg-white/4 text-subtext">+{project.stack.length - 4}</span>
          )}
        </div>

        <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
          {project.demoUrl && (
            <a href={project.demoUrl}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-body font-medium text-white transition-all"
              style={{ background: project.color + '33' }}>
              <ExternalLink size={12} /> Demo
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl glass text-xs font-body text-subtext hover:text-white transition-all">
              <Github size={12} /> Code
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}
