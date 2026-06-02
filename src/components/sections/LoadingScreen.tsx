import { useEffect, useState, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '../../store'

export default function LoadingScreen() {
  const { isLoading, setLoading } = useAppStore()
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<'logo' | 'loading' | 'done'>('logo')
  const interval = useRef<ReturnType<typeof setInterval> | null>(null)

  // Generate static positions once so they don't recalculate on every progress state render
  const floatingSkills = useMemo(() => {
    const skillList = ['React.sys', 'TypeScript.bin', 'Node.core', 'AI.matrix', 'Cybersec.prot', 'MongoDB.db']
    return skillList.map((name, idx) => ({
      name,
      left: `${15 + (idx * 13) % 75}%`,
      top: `${20 + (idx * 17) % 65}%`,
      delay: idx * 0.4
    }))
  }, [])

  const matrixNodes = useMemo(() => {
    return Array.from({ length: 25 }).map((_, idx) => ({
      left: `${(idx * 7) % 100}%`,
      top: `${(idx * 13) % 100}%`,
      color: idx % 3 === 0 ? '#06B6D4' : idx % 3 === 1 ? '#10B981' : '#3B82F6',
      duration: 1.5 + (idx % 3)
    }))
  }, [])

  // Diagnostic logs representing a system terminal boot
  const bootLogs = [
    '>> AXON NEURAL INTERFACE: CONNECTED',
    '>> LOADING CORE MODULES... SUCCESS',
    '>> INJECTING RE-ANIMATION PROTOCOLS',
    '>> COMPILING SKILL ARRAYS...',
    '>> SYNCING GRAPHICS SUB-SYSTEMS',
    '>> OPTIMIZING 3D PIPELINES...',
    '>> BYPASSING FIREWALL... GRANTED',
    '>> MAIN INTERFACE READY TO LAUNCH'
  ]

  // Determine current active log line based on how far progress has come
  const currentLogIdx = Math.min(
    Math.floor((progress / 100) * bootLogs.length),
    bootLogs.length - 1
  )

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('loading'), 400)
    
    interval.current = setInterval(() => {
      setProgress((p) => {
        // Step increases mimicking data packet jumps
        const increment = Math.random() > 0.7 ? Math.random() * 12 : Math.random() * 4
        const next = p + increment
        
        if (next >= 100) {
          clearInterval(interval.current!)
          setPhase('done')
          setTimeout(() => setLoading(false), 800)
          return 100
        }
        return next
      })
    }, 60)

    return () => {
      clearTimeout(t1)
      if (interval.current) clearInterval(interval.current)
    }
  }, [setLoading])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden p-6 select-none font-mono"
          style={{ background: '#030712' }}
          exit={{ opacity: 0, filter: 'blur(10px)' }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Cyber HUD Vignette Grid overlay */}
          <div className="absolute inset-0 pointer-events-none z-10 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(3,7,18,0.8)_100%)]" />
          
          <motion.div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `
                linear-gradient(rgba(6,182,212,0.15) 1px, transparent 1px),
                linear-gradient(90deg, rgba(6,182,212,0.15) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
            animate={{ backgroundPosition: ['0px 0px', '0px 40px'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />

          {/* UI Corner Crosshairs */}
          <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-cyan-500/40" />
          <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-cyan-500/40" />
          <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-cyan-500/40" />
          <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-cyan-500/40" />

          {/* Floating Diagnostic Nodes */}
          {phase !== 'logo' && (
            <>
              {floatingSkills.map((skill) => (
                <motion.div
                  key={skill.name}
                  className="absolute text-[10px] tracking-widest text-emerald-400/30 border border-emerald-500/10 px-2 py-0.5 rounded bg-emerald-950/5"
                  style={{ left: skill.left, top: skill.top }}
                  animate={{ opacity: [0.2, 0.6, 0.2], y: [0, -6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: skill.delay, ease: 'easeInOut' }}
                >
                  {skill.name}
                </motion.div>
              ))}

              {matrixNodes.map((node, idx) => (
                <motion.div
                  key={idx}
                  className="absolute w-1 h-1 rounded-full opacity-20"
                  style={{ backgroundColor: node.color, left: node.left, top: node.top }}
                  animate={{ scale: [1, 2.5, 1], opacity: [0.1, 0.5, 0.1] }}
                  transition={{ duration: node.duration, repeat: Infinity, ease: 'linear' }}
                />
              ))}
            </>
          )}

          {/* Center Processing Matrix */}
          <div className="flex flex-col items-center justify-center max-w-md w-full z-20">
            
            {/* Robot Core Core Logo */}
            <motion.div
              className="relative mb-8"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="w-24 h-24 border border-cyan-500/30 rounded-xl bg-cyan-950/10 backdrop-blur-sm flex items-center justify-center relative overflow-hidden"
                animate={{ boxShadow: ['0 0 15px rgba(6,182,212,0.1)', '0 0 30px rgba(6,182,212,0.3)', '0 0 15px rgba(6,182,212,0.1)'] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {/* Internal Rotating Element */}
                <motion.div 
                  className="absolute w-16 h-16 border border-dashed border-cyan-400/40 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                />
                <span className="font-sans font-black text-3xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 z-10">
                  BS
                </span>
              </motion.div>

              {/* Status Tag */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-cyan-500 text-[9px] text-gray-950 px-2 font-bold tracking-widest rounded-sm uppercase">
                {phase === 'done' ? 'STABLE' : 'ONLINE'}
              </div>
            </motion.div>

            {/* Target Identity */}
            <div className="text-center w-full mb-6">
              <h1 className="text-sm uppercase tracking-[0.3em] text-gray-400 font-bold">
                SYSTEM OPERATOR: <span className="text-white">B. SAHOO</span>
              </h1>
              
              {/* Telemetry scrolling box */}
              <div className="mt-4 h-16 w-full bg-gray-950/80 border border-gray-800 rounded p-3 flex flex-col items-start gap-1 justify-end text-[11px] overflow-hidden text-left shadow-inner">
                {currentLogIdx > 0 && (
                  <span className="text-gray-600 line-clamp-1">{bootLogs[currentLogIdx - 1]}</span>
                )}
                <motion.span 
                  key={currentLogIdx}
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-cyan-400 font-bold tracking-wide flex items-center gap-1.5"
                >
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  {bootLogs[currentLogIdx]}
                </motion.span>
              </div>
            </div>

            {/* Data Matrix / Progress bar */}
            <div className="w-full bg-gray-900/60 border border-gray-800 rounded-lg p-4 backdrop-blur-md">
              <div className="flex justify-between items-center text-[11px] mb-2 tracking-wider">
                <span className="text-gray-500">SYS_INITIALIZATION_VECTOR</span>
                <span className="text-cyan-400 font-bold">{Math.floor(progress)}%</span>
              </div>
              
              <div className="relative w-full h-3 bg-gray-950 rounded-sm border border-gray-800/80 p-0.5 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-400 relative"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'easeOut' }}
                >
                  {/* Sheen animation across the loading progress block */}
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)] w-1/2 h-full animate-[shimmer_1.5s_infinite]" style={{ transform: 'skewX(-20deg)' }} />
                </motion.div>
              </div>

              <div className="mt-3 flex justify-between text-[9px] text-gray-500 tracking-tight">
                <span>RATE: ~{(12.4 + progress * 0.15).toFixed(1)} KB/s</span>
                <span>SYS_BLOCK: 0x77AF{Math.floor(progress)}</span>
              </div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}