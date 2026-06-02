import { useEffect, useRef } from 'react'
import { randomRange } from '../../utils'

interface Particle {
  x: number; y: number; vx: number; vy: number
  size: number; opacity: number; color: string; life: number; maxLife: number
}

const COLORS = ['#7C3AED', '#06B6D4', '#A855F7', '#FFFFFF']

export default function ParticleField({ count = 80 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let particles: Particle[] = []
    let raf: number

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const spawn = (): Particle => ({
      x: randomRange(0, canvas.width),
      y: randomRange(0, canvas.height),
      vx: randomRange(-0.2, 0.2),
      vy: randomRange(-0.4, -0.1),
      size: randomRange(0.5, 2.5),
      opacity: randomRange(0.3, 0.9),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      life: 0,
      maxLife: randomRange(150, 400),
    })

    for (let i = 0; i < count; i++) particles.push(spawn())

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p, i) => {
        p.life++
        p.x += p.vx
        p.y += p.vy
        const t = p.life / p.maxLife
        const alpha = p.opacity * (t < 0.1 ? t / 0.1 : t > 0.8 ? (1 - t) / 0.2 : 1)
        ctx.save()
        ctx.globalAlpha = alpha
        ctx.fillStyle = p.color
        ctx.shadowBlur = 6
        ctx.shadowColor = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
        if (p.life >= p.maxLife) particles[i] = spawn()
      })
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [count])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-60" />
}
