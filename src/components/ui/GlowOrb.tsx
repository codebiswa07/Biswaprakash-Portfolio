interface Props {
  x?: string; y?: string; color?: string; size?: string; opacity?: number
}
export default function GlowOrb({ x = '50%', y = '50%', color = '#7C3AED', size = '600px', opacity = 0.12 }: Props) {
  return (
    <div
      className="absolute pointer-events-none rounded-full blur-3xl"
      style={{ left: x, top: y, width: size, height: size, background: color, opacity, transform: 'translate(-50%,-50%)' }}
    />
  )
}
