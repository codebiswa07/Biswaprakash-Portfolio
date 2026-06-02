import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Sparkles, Code2, ArrowRight } from 'lucide-react'
import { lazy, Suspense } from 'react'

const Scene = lazy(() => import('../3d/Scene'))

const titles = [
  'Full Stack Developer', 
  'AI Enthusiast', 
  'CyberSecurity Enthusiast', 
  'Software Engineer in Progress'
]

export default function HeroSection() {
  const [titleIdx, setTitleIdx] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const target = titles[titleIdx]
    const speed = isDeleting ? 40 : 80

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < target.length) {
          setDisplayText(target.slice(0, displayText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1))
        } else {
          setIsDeleting(false)
          setTitleIdx((i) => (i + 1) % titles.length)
        }
      }
    }, speed)

    return () => clearTimeout(timer)
  }, [displayText, isDeleting, titleIdx])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      setMousePos({ x, y })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
  }
  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <section id="hero" ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Ambient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/8 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-secondary/8 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center py-24">
        {/* Left: Text */}
        <motion.div variants={container} initial="hidden" animate="show" className="relative z-10">
          <motion.div variants={item} className="flex items-center gap-2 mb-6">
            <div className="h-px w-12 bg-secondary" />
            <span className="font-mono text-secondary text-sm tracking-widest uppercase">Available for Hire</span>
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          </motion.div>

          <motion.p variants={item} className="font-body text-subtext text-xl mb-2">
            Hi, I'm
          </motion.p>

          <motion.h1 variants={item} className="font-display font-bold text-5xl md:text-7xl lg:text-8xl leading-none mb-4">
            <span className="gradient-text">Biswaprakash</span>
            <br />
            <span className="text-white">Sahoo</span>
          </motion.h1>

          <motion.div variants={item} className="flex items-center gap-2 mb-8 h-8">
            <Code2 size={18} className="text-secondary flex-shrink-0" />
            <span className="font-mono text-secondary text-lg">
              {displayText}
              <span className="inline-block w-0.5 h-5 bg-secondary animate-pulse ml-0.5 align-middle" />
            </span>
          </motion.div>

          <motion.p variants={item} className="text-subtext font-body text-lg leading-relaxed mb-10 max-w-lg">
            Building digital experiences through code, creativity, and innovation. Passionate about the intersection of
            AI and modern web development.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap gap-4">
            <a href="#projects"
              className="group flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-white font-body font-medium hover:bg-primary/90 transition-all hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5">
              <Sparkles size={16} />
              Explore My Work
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#about"
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl glass border border-white/10 text-white font-body font-medium hover:border-primary/40 transition-all hover:-translate-y-0.5">
              About Me
            </a>
          </motion.div>

          <motion.div variants={item} className="flex items-center gap-8 mt-12">
            {[['5+', 'Projects'], ['2+', 'Years Learning'], ['∞', 'Curiosity']].map(([val, label]) => (
              <div key={label}>
                <div className="font-display font-bold text-2xl gradient-text">{val}</div>
                <div className="text-subtext text-xs font-mono">{label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: 3D Scene */}
        <motion.div
          className="relative h-[500px] lg:h-[600px]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <Suspense fallback={
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-32 h-32 rounded-full border border-primary/30 animate-spin-slow" />
            </div>
          }>
            <Scene mouseX={mousePos.x} mouseY={mousePos.y} />
          </Suspense>

          {/* Floating labels */}
          {[
            { label: 'React', top: '15%', left: '5%', color: '#61DAFB' },
            { label: 'Python', top: '70%', left: '8%', color: '#3776AB' },
            { label: 'Three.js', top: '20%', right: '5%', color: '#FFFFFF' },
            { label: 'AI/ML', top: '75%', right: '8%', color: '#A855F7' },
          ].map((tag) => (
            <motion.div
              key={tag.label}
              className="absolute glass px-3 py-1.5 rounded-lg text-xs font-mono font-medium"
              style={{ top: tag.top, left: tag.left, right: tag.right, color: tag.color, borderColor: tag.color + '33' }}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              {tag.label}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-subtext hover:text-white transition-colors"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
        <ChevronDown size={16} />
      </motion.a>
    </section>
  )
}
