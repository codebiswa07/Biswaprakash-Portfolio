import { useGLTF } from "@react-three/drei";

export default function StudentRoom() {
  const { scene } = useGLTF("/models/StudentStudy.glb");

  return (
    <primitive
      object={scene}
      scale={1}
      position={[0, 0, 0]}
    />
  );
}

useGLTF.preload("/models/StudentStudy.glb");