import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import { Model as StudentStudy } from "./StudentStudy"
// import CyberParticles from "./CyberParticles"

type SceneProps = {
  mouseX?: number
  mouseY?: number
}

export default function Scene({ mouseX = 0, mouseY = 0 }: SceneProps) {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [3, 2, 5], fov: 45 }} shadows>
        {/* <pointLight position={[0, 2, 2]} color="#00ff88" intensity={1.5} />
        <ambientLight intensity={0.4} /> */}
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={2} castShadow />
        {/* <CyberParticles /> */}
        <StudentStudy
          scale={1}
          position={[mouseX * 0.2, -1 + mouseY * 0.1, 0]}
        />

        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  )
}