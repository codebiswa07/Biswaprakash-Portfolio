import { useEffect, useRef, useState } from 'react'
import { lerp } from '../../utils'

const TAIL_CELLS = 6 // Number of trailing organic glass cells

export default function HyperLiquidCursor() {
  const coreRef = useRef<HTMLDivElement>(null)
  const membraneRef = useRef<HTMLDivElement>(null)
  const cellsRef = useRef<HTMLDivElement[]>([])
  
  const [variant, setVariant] = useState<'default' | 'hovered' | 'clicked'>('default')

  // Vectors for tracking positions
  const mouse = useRef({ x: 0, y: 0 })
  const membrane = useRef({ x: 0, y: 0 })
  const tailPositions = useRef(Array.from({ length: TAIL_CELLS }, () => ({ x: 0, y: 0 })))
  
  // Velocity tracking variables
  const lastMembranePos = useRef({ x: 0, y: 0 })
  const speed = useRef(0)
  const angle = useRef(0)
  const raf = useRef<number>(0)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
    }

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [data-hoverable], .interactive')) {
        setVariant('hovered')
      } else {
        setVariant('default')
      }
    }

    const onMouseDown = () => setVariant('clicked')
    const onMouseUp = () => setVariant('default')

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onMouseOver)
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)

    const animate = () => {
      // 1. Position the Bioluminescent Core
      if (coreRef.current) {
        coreRef.current.style.transform = `translate3d(${mouse.current.x - 6}px, ${mouse.current.y - 6}px, 0)`
      }

      // 2. Animate Main Glass Membrane with Inertia
      const lerpFactor = variant === 'hovered' ? 0.07 : 0.12
      membrane.current.x = lerp(membrane.current.x, mouse.current.x, lerpFactor)
      membrane.current.y = lerp(membrane.current.y, mouse.current.y, lerpFactor)

      // Calculate physics metrics (Speed and Direction angle)
      const velX = membrane.current.x - lastMembranePos.current.x
      const velY = membrane.current.y - lastMembranePos.current.y
      lastMembranePos.current = { x: membrane.current.x, y: membrane.current.y }

      const currentSpeed = Math.sqrt(velX * velX + velY * velY)
      speed.current = lerp(speed.current, currentSpeed, 0.15)
      if (currentSpeed > 0.5) {
        angle.current = Math.atan2(velY, velX) * (180 / Math.PI)
      }

      if (membraneRef.current) {
        let baseSize = variant === 'hovered' ? 84 : 48
        if (variant === 'clicked') baseSize = 36

        const stretch = Math.min(speed.current * 0.03, 0.5)
        
        membraneRef.current.style.width = `${baseSize}px`
        membraneRef.current.style.height = `${baseSize}px`
        membraneRef.current.style.transform = `
          translate3d(${membrane.current.x - baseSize / 2}px, ${membrane.current.y - baseSize / 2}px, 0)
          rotate(${angle.current}deg)
          scale3d(${1 + stretch}, ${1 - stretch * 0.5}, 1)
        `
      }

      // 3. Animate the Cellular Snake Tail (Physics Chain)
      tailPositions.current.forEach((pos, i) => {
        // First cell follows membrane; trailing cells follow previous cell
        const targetX = i === 0 ? membrane.current.x : tailPositions.current[i - 1].x
        const targetY = i === 0 ? membrane.current.y : tailPositions.current[i - 1].y

        // Add internal water-drag friction
        const cellFactor = 0.28 - i * 0.03
        pos.x = lerp(pos.x, targetX, cellFactor)
        pos.y = lerp(pos.y, targetY, cellFactor)

        const cellEl = cellsRef.current[i]
        if (cellEl) {
          // Dynamic scale: cells taper downward linearly toward the tail end
          const scale = (1 - i / TAIL_CELLS) * (variant === 'hovered' ? 1.4 : 1.0)
          const cellSize = 16 * scale
          
          cellEl.style.width = `${cellSize}px`
          cellEl.style.height = `${cellSize}px`
          cellEl.style.transform = `translate3d(${pos.x - cellSize / 2}px, ${pos.y - cellSize / 2}px, 0)`
        }
      })

      raf.current = requestAnimationFrame(animate)
    }

    raf.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onMouseOver)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      cancelAnimationFrame(raf.current)
    }
  }, [variant])

  return (
    <>
      {/* 1. Central Quantum/Bioluminescent nucleus */}
      <div ref={coreRef} className={`hyper-core state-${variant}`} />

      {/* 2. Main High-Refraction Sculpted Membrane */}
      <div ref={membraneRef} className={`hyper-membrane state-${variant}`} />

      {/* 3. Trailing Multi-Chambered Glass Cells */}
      <div className="hyper-tail-layer">
        {Array.from({ length: TAIL_CELLS }).map((_, i) => (
          <div
            key={i}
            ref={(el) => { if (el) cellsRef.current[i] = el }}
            className={`hyper-cell state-${variant}`}
            style={{ 
              zIndex: 9998 - i,
              opacity: 1 - (i / TAIL_CELLS) * 0.4 // Soft organic fade out
            }}
          />
        ))}
      </div>
    </>
  )
}