import { Text, Sparkles } from "@react-three/drei"

export default function CyberParticles() {
  const codes = Array.from({ length: 45 }, (_, i) => ({
    id: i,
    text: Math.random() > 0.5 ? "1010" : "0101",
    x: (Math.random() - 0.5) * 6,
    y: Math.random() * 3,
    z: (Math.random() - 0.5) * 4,
  }))

  return (
    <group>
      <Sparkles
        count={120}
        scale={[6, 3, 4]}
        size={2}
        speed={0.4}
        color="#00ff88"
      />

      {codes.map((code) => (
        <Text
          key={code.id}
          position={[code.x, code.y, code.z]}
          fontSize={0.08}
          color="#00ff88"
          anchorX="center"
          anchorY="middle"
        >
          {code.text}
        </Text>
      ))}
    </group>
  )
}