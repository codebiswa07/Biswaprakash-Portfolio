import { Github, Linkedin, Mail, Heart } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="font-display font-bold text-xl">
              Biswa<span className="text-primary">prakash</span>
            </p>
            <p className="text-subtext text-sm mt-1">Full Stack Developer · AI Enthusiast</p>
          </div>

          <div className="flex items-center gap-4">
            {[
              { icon: <Github size={18} />, href: 'https://github.com/', label: 'GitHub' },
              { icon: <Linkedin size={18} />, href: 'https://linkedin.com/', label: 'LinkedIn' },
              { icon: <Mail size={18} />, href: 'mailto:biswaprakash@email.com', label: 'Email' },
            ].map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                whileHover={{ y: -2, scale: 1.1 }}
                className="w-10 h-10 rounded-xl glass flex items-center justify-center text-subtext hover:text-white hover:border-primary/40 transition-colors"
              >
                {s.icon}
              </motion.a>
            ))}
          </div>

          <p className="text-subtext text-sm flex items-center gap-1">
            Made with <Heart size={13} className="text-primary mx-0.5" fill="currentColor" /> in Odisha, India
          </p>
        </div>
      </div>
    </footer>
  )
}
