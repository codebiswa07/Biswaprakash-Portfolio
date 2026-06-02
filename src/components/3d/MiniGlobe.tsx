import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function FloatingNode({ color = '#7C3AED', size = 0.3 }: { color?: string; size?: number }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.8
  })
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[size, 1]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} wireframe />
    </mesh>
  )
}
