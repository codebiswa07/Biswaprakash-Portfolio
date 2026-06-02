import { Canvas } from '@react-three/fiber'
import { Environment, Stars, AdaptiveDpr, PerformanceMonitor } from '@react-three/drei'
import { Suspense, useRef, useState } from 'react'
import InnovationCrystal from './InnovationCrystal'

interface Props {
  mouseX?: number; mouseY?: number
}

export default function Scene({ mouseX = 0, mouseY = 0 }: Props) {
  const [dpr, setDpr] = useState(1.5)

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={dpr}
      style={{ background: 'transparent' }}
      gl={{ antialias: true, alpha: true }}
    >
      <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(1.5)} />
      <AdaptiveDpr pixelated />

      <Suspense fallback={null}>
        <InnovationCrystal mouseX={mouseX} mouseY={mouseY} />
        <Stars radius={80} depth={50} count={3000} factor={3} fade speed={0.5} />
        <Environment preset="city" />
      </Suspense>

      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
    </Canvas>
  )
}
