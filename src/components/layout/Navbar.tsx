import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useAppStore } from '../../store'

const navItems = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Journey', href: '#roadmap' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { setCursorVariant } = useAppStore()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass py-3' : 'py-5'}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="group flex items-center gap-3"
          onMouseEnter={() => setCursorVariant('hovered')}
          onMouseLeave={() => setCursorVariant('default')}
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-display font-bold text-lg shadow-lg group-hover:shadow-primary/50 transition-shadow">
            B
          </div>
          <span className="font-display font-semibold text-white hidden sm:block">
            Biswa<span className="text-primary">.</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="px-4 py-2 text-sm font-body text-subtext hover:text-white transition-colors rounded-lg hover:bg-white/5"
                onMouseEnter={() => setCursorVariant('hovered')}
                onMouseLeave={() => setCursorVariant('default')}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary/90 hover:bg-primary text-white text-sm font-body font-medium transition-all hover:shadow-lg hover:shadow-primary/30"
          onMouseEnter={() => setCursorVariant('hovered')}
          onMouseLeave={() => setCursorVariant('default')}
        >
          Hire Me
        </a>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden glass mx-4 mt-2 rounded-2xl overflow-hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <ul className="p-4 flex flex-col gap-1">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="block px-4 py-3 text-sm text-subtext hover:text-white rounded-xl hover:bg-white/5 transition-colors"
                    onClick={() => setMobileOpen(false)}>
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="mt-2">
                <a href="#contact" onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-white bg-primary rounded-xl text-center">
                  Hire Me
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
