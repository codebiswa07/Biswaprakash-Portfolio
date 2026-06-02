import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshTransmissionMaterial, Float, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

export default function InnovationCrystal({ mouseX = 0, mouseY = 0 }: { mouseX?: number; mouseY?: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const innerRef = useRef<THREE.Mesh>(null)
  const ringRef = useRef<THREE.Mesh>(null)

  const crystalGeometry = useMemo(() => {
    const geo = new THREE.OctahedronGeometry(1.4, 2)
    const pos = geo.attributes.position
    for (let i = 0; i < pos.count; i++) {
      pos.setXYZ(i, pos.getX(i) + Math.random() * 0.08 - 0.04, pos.getY(i) + Math.random() * 0.08 - 0.04, pos.getZ(i) + Math.random() * 0.08 - 0.04)
    }
    geo.computeVertexNormals()
    return geo
  }, [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.3 + mouseX * 0.5
      meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.2 + mouseY * 0.3
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.5
      innerRef.current.rotation.z = t * 0.3
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.2
      ringRef.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.4) * 0.1
    }
  })

  return (
    <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.8}>
      <group>
        {/* Outer crystal */}
        <mesh ref={meshRef} geometry={crystalGeometry} castShadow>
          <MeshTransmissionMaterial
            backside
            samples={8}
            thickness={0.4}
            roughness={0.02}
            transmission={0.95}
            ior={1.6}
            chromaticAberration={0.08}
            color="#A855F7"
            distortionScale={0.2}
            temporalDistortion={0.1}
          />
        </mesh>

        {/* Inner glowing core */}
        <mesh ref={innerRef} scale={0.45}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color="#06B6D4"
            emissive="#06B6D4"
            emissiveIntensity={3}
            wireframe
          />
        </mesh>

        {/* Orbital ring */}
        <mesh ref={ringRef}>
          <torusGeometry args={[2, 0.02, 8, 64]} />
          <meshStandardMaterial color="#7C3AED" emissive="#7C3AED" emissiveIntensity={2} />
        </mesh>

        {/* Second ring offset */}
        <mesh rotation={[Math.PI / 3, 0, Math.PI / 6]}>
          <torusGeometry args={[2.3, 0.015, 8, 64]} />
          <meshStandardMaterial color="#06B6D4" emissive="#06B6D4" emissiveIntensity={1.5} />
        </mesh>

        {/* Sparkles */}
        <Sparkles count={60} scale={5} size={1.5} speed={0.4} color="#A855F7" />
        <Sparkles count={40} scale={3} size={1} speed={0.6} color="#06B6D4" />

        {/* Point lights */}
        <pointLight color="#7C3AED" intensity={4} distance={6} />
        <pointLight color="#06B6D4" intensity={2} distance={4} position={[2, 0, 0]} />
      </group>
    </Float>
  )
}
