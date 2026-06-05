import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

// ── Types ─────────────────────────────────────────────────────────────────────
interface LaptopProps {
  screenGlow: number;
}

interface PenProps {
  handY: number;
}

interface DeskLampProps {
  flicker: number;
}

interface StudentProps {
  mousePos: React.MutableRefObject<{ x: number; y: number }>;
}

// ── Dust Particles ────────────────────────────────────────────────────────────
function DustParticles() {
  const mesh = useRef<THREE.Points>(null);
  const count = 120;

  const { positions, speeds, offsets } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds: number[] = [];
    const offsets: number[] = [];
    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 5;
      positions[i * 3 + 1] = Math.random() * 3;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
      speeds.push(0.002 + Math.random() * 0.003);
      offsets.push(Math.random() * Math.PI * 2);
    }
    return { positions, speeds, offsets };
  }, []);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const t = clock.getElapsedTime();
    const pos = (mesh.current.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += speeds[i];
      pos[i * 3]     += Math.sin(t * 0.3 + offsets[i]) * 0.001;
      if (pos[i * 3 + 1] > 3.5) pos[i * 3 + 1] = 0;
    }
    (mesh.current.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#ffe8c0" size={0.012} transparent opacity={0.55} sizeAttenuation />
    </points>
  );
}

// ── Desk ──────────────────────────────────────────────────────────────────────
function Desk() {
  const woodMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#8B5E3C", roughness: 0.6, metalness: 0.05 }),
    []
  );
  const legMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#5a3e28", roughness: 0.7, metalness: 0.0 }),
    []
  );

  const legPositions: [number, number][] = [[-1.1, -0.38], [1.1, -0.38], [-1.1, 0.38], [1.1, 0.38]];

  return (
    <group position={[0, 0, 0]}>
      <mesh receiveShadow castShadow material={woodMat} position={[0, 0.76, 0]}>
        <boxGeometry args={[2.4, 0.06, 1.1]} />
      </mesh>
      {legPositions.map(([x, z], i) => (
        <mesh key={i} receiveShadow castShadow material={legMat} position={[x, 0.38, z]}>
          <boxGeometry args={[0.06, 0.76, 0.06]} />
        </mesh>
      ))}
      <mesh receiveShadow castShadow material={legMat} position={[0, 0.18, 0]}>
        <boxGeometry args={[2.2, 0.04, 0.04]} />
      </mesh>
    </group>
  );
}

// ── Chair ─────────────────────────────────────────────────────────────────────
function Chair() {
  const fabric = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#2b3a4a", roughness: 0.85, metalness: 0.0 }),
    []
  );
  const metal = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#888888", roughness: 0.3, metalness: 0.85 }),
    []
  );

  return (
    <group position={[0, 0, 0.72]}>
      <mesh receiveShadow castShadow material={fabric} position={[0, 0.46, 0]}>
        <boxGeometry args={[0.52, 0.07, 0.52]} />
      </mesh>
      <mesh receiveShadow castShadow material={fabric} position={[0, 0.78, 0.24]}>
        <boxGeometry args={[0.5, 0.55, 0.07]} />
      </mesh>
      <mesh receiveShadow castShadow material={fabric} position={[0, 0.64, 0.21]}>
        <boxGeometry args={[0.38, 0.15, 0.06]} />
      </mesh>
      {([-0.29, 0.29] as number[]).map((x, i) => (
        <group key={i}>
          <mesh castShadow material={metal} position={[x, 0.52, 0.08]}>
            <cylinderGeometry args={[0.02, 0.02, 0.15, 8]} />
          </mesh>
          <mesh castShadow material={fabric} position={[x, 0.6, 0.08]}>
            <boxGeometry args={[0.06, 0.04, 0.2]} />
          </mesh>
        </group>
      ))}
      <mesh castShadow material={metal} position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.4, 8]} />
      </mesh>
      {Array.from({ length: 5 }).map((_, i) => {
        const angle = (i / 5) * Math.PI * 2;
        return (
          <mesh
            key={i}
            castShadow
            material={metal}
            position={[Math.cos(angle) * 0.22, 0.04, Math.sin(angle) * 0.22]}
            rotation={[0, -angle, 0]}
          >
            <boxGeometry args={[0.44, 0.03, 0.045]} />
          </mesh>
        );
      })}
      {Array.from({ length: 5 }).map((_, i) => {
        const angle = (i / 5) * Math.PI * 2;
        return (
          <mesh
            key={i}
            castShadow
            material={metal}
            position={[Math.cos(angle) * 0.35, 0.03, Math.sin(angle) * 0.35]}
          >
            <sphereGeometry args={[0.025, 6, 6]} />
          </mesh>
        );
      })}
    </group>
  );
}

// ── Laptop ────────────────────────────────────────────────────────────────────
function Laptop({ screenGlow }: LaptopProps) {
  const bodyMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#c0c0c8", roughness: 0.2, metalness: 0.9 }),
    []
  );
  const screenMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#1a2a3a",
        emissive: new THREE.Color(0.4 * screenGlow, 0.7 * screenGlow, 1.0 * screenGlow),
        emissiveIntensity: 1,
        roughness: 0.05,
        metalness: 0.1,
      }),
    [screenGlow]
  );

  return (
    <group position={[-0.4, 0.8, -0.12]}>
      <mesh castShadow receiveShadow material={bodyMat} position={[0, 0, 0]}>
        <boxGeometry args={[0.52, 0.018, 0.36]} />
      </mesh>
      <mesh castShadow receiveShadow material={bodyMat} position={[0, 0.19, -0.175]} rotation={[-1.1, 0, 0]}>
        <boxGeometry args={[0.52, 0.32, 0.016]} />
      </mesh>
      <mesh material={screenMat} position={[0, 0.19, -0.166]} rotation={[-1.1, 0, 0]}>
        <boxGeometry args={[0.48, 0.29, 0.001]} />
      </mesh>
      <pointLight position={[0, 0.28, -0.12]} color="#7ab8ff" intensity={screenGlow * 0.6} distance={1.2} />
    </group>
  );
}

// ── Notebook ──────────────────────────────────────────────────────────────────
function Notebook() {
  const cover = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#2e4a6b", roughness: 0.8, metalness: 0 }),
    []
  );
  const page = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#f5f0e8", roughness: 0.95 }),
    []
  );
  const lineMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#b0b8c8" }),
    []
  );

  return (
    <group position={[0.35, 0.795, 0.08]} rotation={[0, 0.18, 0]}>
      <mesh castShadow receiveShadow material={cover} position={[0, 0, 0]}>
        <boxGeometry args={[0.28, 0.016, 0.22]} />
      </mesh>
      <mesh material={page} position={[0.01, 0.01, 0]}>
        <boxGeometry args={[0.26, 0.004, 0.2]} />
      </mesh>
      {([-0.06, -0.02, 0.02, 0.06] as number[]).map((z, i) => (
        <mesh key={i} material={lineMat} position={[0.01, 0.014, z]}>
          <boxGeometry args={[0.22, 0.001, 0.003]} />
        </mesh>
      ))}
    </group>
  );
}

// ── Pen ───────────────────────────────────────────────────────────────────────
function Pen({ handY }: PenProps) {
  const mat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#1a1a2e", roughness: 0.3, metalness: 0.6 }),
    []
  );
  const tipMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#e0e0e0", metalness: 0.8 }),
    []
  );

  return (
    <group position={[0.5, 0.8 + handY * 0.005, 0.06]} rotation={[0, 0.3, Math.PI / 2 - 0.15]}>
      <mesh castShadow material={mat}>
        <cylinderGeometry args={[0.006, 0.006, 0.16, 8]} />
      </mesh>
      <mesh castShadow material={tipMat} position={[0, -0.085, 0]}>
        <coneGeometry args={[0.006, 0.02, 8]} />
      </mesh>
    </group>
  );
}

// ── Coffee Mug ────────────────────────────────────────────────────────────────
function CoffeeMug() {
  const ceramic = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#e8e0d0", roughness: 0.6 }),
    []
  );
  const coffee = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#3a1a0a", roughness: 0.2 }),
    []
  );

  return (
    <group position={[-0.9, 0.82, 0.2]}>
      <mesh castShadow receiveShadow material={ceramic}>
        <cylinderGeometry args={[0.045, 0.038, 0.1, 16]} />
      </mesh>
      <mesh material={coffee} position={[0, 0.048, 0]}>
        <cylinderGeometry args={[0.042, 0.042, 0.006, 16]} />
      </mesh>
      <mesh castShadow material={ceramic} position={[0.06, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.025, 0.007, 8, 12, Math.PI]} />
      </mesh>
    </group>
  );
}

// ── Book Stack ────────────────────────────────────────────────────────────────
function BookStack() {
  const bookColors = ["#c0392b", "#2980b9", "#27ae60", "#f39c12"] as const;

  return (
    <group position={[-0.82, 0.79, -0.22]}>
      {bookColors.map((c, i) => (
        <mesh
          key={i}
          castShadow
          receiveShadow
          material={new THREE.MeshStandardMaterial({ color: c, roughness: 0.7 })}
          position={[(i % 2) * 0.01 - 0.005, i * 0.038, 0]}
        >
          <boxGeometry args={[0.15, 0.034, 0.22]} />
        </mesh>
      ))}
    </group>
  );
}

// ── Desk Lamp ─────────────────────────────────────────────────────────────────
function DeskLamp({ flicker }: DeskLampProps) {
  const metal = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#d4af37", roughness: 0.3, metalness: 0.9 }),
    []
  );
  const bulbMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#fff8e1",
        emissive: new THREE.Color("#ffe880"),
        emissiveIntensity: flicker,
        roughness: 0.1,
      }),
    [flicker]
  );

  return (
    <group position={[0.82, 0.79, -0.32]}>
      <mesh castShadow material={metal} position={[0, 0.03, 0]}>
        <cylinderGeometry args={[0.06, 0.07, 0.025, 16]} />
      </mesh>
      <mesh castShadow material={metal} position={[0, 0.22, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 0.4, 8]} />
      </mesh>
      <mesh castShadow material={metal} position={[0.1, 0.44, 0]} rotation={[0, 0, -0.4]}>
        <cylinderGeometry args={[0.01, 0.01, 0.22, 8]} />
      </mesh>
      <mesh castShadow material={metal} position={[0.22, 0.5, 0]} rotation={[0, 0, 0.5]}>
        <coneGeometry args={[0.065, 0.09, 12, 1, true]} />
      </mesh>
      <mesh material={bulbMat} position={[0.22, 0.46, 0]}>
        <sphereGeometry args={[0.022, 10, 10]} />
      </mesh>
      <pointLight
        position={[0.22, 0.45, 0]}
        color="#ffcc66"
        intensity={flicker * 2.2}
        distance={2.2}
        castShadow
        shadow-mapSize={[512, 512] as unknown as THREE.Vector2}
      />
    </group>
  );
}

// ── Small Plant ───────────────────────────────────────────────────────────────
function SmallPlant() {
  const pot  = useMemo(() => new THREE.MeshStandardMaterial({ color: "#b85c38", roughness: 0.8 }), []);
  const soil = useMemo(() => new THREE.MeshStandardMaterial({ color: "#3a2010", roughness: 1 }), []);
  const leaf = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#2d8c4e", roughness: 0.7, side: THREE.DoubleSide }),
    []
  );

  const leafAngles = [0, 1.2, 2.4, 3.6, 4.8] as const;

  return (
    <group position={[0.88, 0.82, -0.04]}>
      <mesh castShadow material={pot}>
        <cylinderGeometry args={[0.045, 0.035, 0.07, 12]} />
      </mesh>
      <mesh material={soil} position={[0, 0.037, 0]}>
        <cylinderGeometry args={[0.042, 0.042, 0.008, 12]} />
      </mesh>
      {leafAngles.map((angle, i) => (
        <mesh
          key={i}
          castShadow
          material={leaf}
          position={[Math.cos(angle) * 0.025, 0.07 + i * 0.025, Math.sin(angle) * 0.025]}
          rotation={[0.3 - i * 0.04, angle, 0.2]}
        >
          {/* Use circleGeometry scaled as ellipse instead of ellipseGeometry */}
          <circleGeometry args={[0.035, 8]} />
        </mesh>
      ))}
    </group>
  );
}

// ── Floor / Wall ──────────────────────────────────────────────────────────────
function Environment3D() {
  const floor = useMemo(() => new THREE.MeshStandardMaterial({ color: "#d4c8b8", roughness: 0.9 }), []);
  const wall  = useMemo(() => new THREE.MeshStandardMaterial({ color: "#f0ece4", roughness: 0.95 }), []);

  return (
    <>
      <mesh receiveShadow material={floor} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[8, 8]} />
      </mesh>
      <mesh receiveShadow material={wall} position={[0, 2.5, -1.8]}>
        <planeGeometry args={[8, 6]} />
      </mesh>
    </>
  );
}

// ── Student ───────────────────────────────────────────────────────────────────
function Student({ mousePos }: StudentProps) {
  const groupRef    = useRef<THREE.Group>(null);
  const headRef     = useRef<THREE.Group>(null);
  const torsoRef    = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);

  const skin  = useMemo(() => new THREE.MeshStandardMaterial({ color: "#d4956a", roughness: 0.75 }), []);
  const hair  = useMemo(() => new THREE.MeshStandardMaterial({ color: "#1a0a00", roughness: 0.9 }), []);
  const shirt = useMemo(() => new THREE.MeshStandardMaterial({ color: "#3a5a8a", roughness: 0.7 }), []);
  const pants = useMemo(() => new THREE.MeshStandardMaterial({ color: "#2a2a3a", roughness: 0.75 }), []);
  const shoe  = useMemo(() => new THREE.MeshStandardMaterial({ color: "#1a1a1a", roughness: 0.6 }), []);
  const white = useMemo(() => new THREE.MeshStandardMaterial({ color: "#ffffff", roughness: 0.6 }), []);
  const eyeWhite = useMemo(() => new THREE.MeshStandardMaterial({ color: "#ffffff" }), []);
  const eyeIris  = useMemo(() => new THREE.MeshStandardMaterial({ color: "#1a0a00" }), []);
  const eyePupil = useMemo(() => new THREE.MeshStandardMaterial({ color: "#000000" }), []);
  const lipMat   = useMemo(() => new THREE.MeshStandardMaterial({ color: "#b05040" }), []);
  const glassMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#333333", metalness: 0.8 }), []);
  const bridgeMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#555555", metalness: 0.8 }), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Breathing
    if (torsoRef.current) {
      torsoRef.current.scale.y = 1 + Math.sin(t * 1.4) * 0.008;
    }

    // Writing hand animation
    if (rightArmRef.current) {
      rightArmRef.current.position.x = 0.22 + Math.sin(t * 2.2) * 0.012;
      rightArmRef.current.position.z = 0.08 + Math.cos(t * 1.8) * 0.008;
    }

    // Head follows mouse OR reads book
    if (headRef.current) {
      const mx   = mousePos.current.x * 0.45;
      const my   = -mousePos.current.y * 0.25;
      const dist = Math.sqrt(mousePos.current.x ** 2 + mousePos.current.y ** 2);
      const readTilt = dist < 0.1 ? -0.22 : 0;

      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, mx, 0.06);
      headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, my + readTilt, 0.06);
      headRef.current.rotation.z = THREE.MathUtils.lerp(headRef.current.rotation.z, 0, 0.06);

      if (dist < 0.1) {
        headRef.current.position.x = Math.sin(t * 0.5) * 0.003;
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.49, 0.72]}>
      {/* Torso */}
      <group ref={torsoRef} position={[0, 0.38, -0.12]}>
        <mesh castShadow material={shirt} position={[0, 0, 0]}>
          <boxGeometry args={[0.32, 0.38, 0.2]} />
        </mesh>
        <mesh castShadow material={white} position={[0, 0.17, 0.08]}>
          <boxGeometry args={[0.1, 0.06, 0.03]} />
        </mesh>
      </group>

      {/* Neck */}
      <mesh castShadow material={skin} position={[0, 0.59, -0.06]}>
        <cylinderGeometry args={[0.04, 0.045, 0.1, 10]} />
      </mesh>

      {/* Head */}
      <group ref={headRef} position={[0, 0.72, -0.04]}>
        <mesh castShadow material={skin}>
          <sphereGeometry args={[0.115, 18, 14]} />
        </mesh>
        {/* Hair */}
        <mesh castShadow material={hair} position={[0, 0.06, -0.01]} scale={[1.02, 0.65, 1.02]}>
          <sphereGeometry args={[0.115, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        </mesh>
        <mesh castShadow material={hair} position={[0, 0.02, -0.1]}>
          <boxGeometry args={[0.22, 0.12, 0.04]} />
        </mesh>
        {/* Eyes */}
        {([-0.038, 0.038] as number[]).map((x, i) => (
          <group key={i} position={[x, 0.02, 0.1]}>
            <mesh material={eyeWhite}>
              <sphereGeometry args={[0.018, 8, 8]} />
            </mesh>
            <mesh material={eyeIris} position={[0, 0, 0.012]}>
              <sphereGeometry args={[0.011, 8, 8]} />
            </mesh>
            <mesh material={eyePupil} position={[0, 0, 0.023]}>
              <sphereGeometry args={[0.007, 6, 6]} />
            </mesh>
          </group>
        ))}
        {/* Nose */}
        <mesh castShadow material={skin} position={[0, -0.01, 0.108]}>
          <sphereGeometry args={[0.018, 6, 6]} />
        </mesh>
        {/* Mouth */}
        <mesh material={lipMat} position={[0, -0.038, 0.104]}>
          <boxGeometry args={[0.04, 0.01, 0.01]} />
        </mesh>
        {/* Glasses */}
        {([-0.04, 0.04] as number[]).map((x, i) => (
          <mesh key={i} material={glassMat} position={[x, 0.018, 0.108]}>
            <torusGeometry args={[0.024, 0.0035, 8, 20]} />
          </mesh>
        ))}
        <mesh material={bridgeMat} position={[0, 0.018, 0.108]}>
          <boxGeometry args={[0.016, 0.003, 0.001]} />
        </mesh>
      </group>

      {/* Left arm (resting on desk) */}
      <group position={[-0.22, 0.35, 0.04]} rotation={[0.45, 0, 0.2]}>
        <mesh castShadow material={shirt}>
          <capsuleGeometry args={[0.04, 0.22, 6, 8]} />
        </mesh>
        <mesh castShadow material={skin} position={[0, -0.15, 0]}>
          <sphereGeometry args={[0.043, 8, 8]} />
        </mesh>
      </group>

      {/* Right arm (writing) */}
      <group ref={rightArmRef} position={[0.22, 0.35, 0.08]} rotation={[0.55, -0.2, -0.2]}>
        <mesh castShadow material={shirt}>
          <capsuleGeometry args={[0.04, 0.22, 6, 8]} />
        </mesh>
        <mesh castShadow material={skin} position={[0, -0.14, 0]}>
          <sphereGeometry args={[0.04, 8, 8]} />
        </mesh>
      </group>

      {/* Hips */}
      <mesh castShadow material={pants} position={[0, 0.17, -0.1]}>
        <boxGeometry args={[0.3, 0.2, 0.24]} />
      </mesh>

      {/* Thighs */}
      {([-0.1, 0.1] as number[]).map((x, i) => (
        <mesh key={i} castShadow material={pants} position={[x, 0.08, 0.06]} rotation={[0.55, 0, 0]}>
          <capsuleGeometry args={[0.06, 0.28, 6, 8]} />
        </mesh>
      ))}

      {/* Lower legs */}
      {([-0.1, 0.1] as number[]).map((x, i) => (
        <group key={i} position={[x, -0.17, 0.26]}>
          <mesh castShadow material={pants}>
            <capsuleGeometry args={[0.045, 0.26, 6, 8]} />
          </mesh>
          <mesh castShadow material={shoe} position={[0, -0.16, 0.04]}>
            <boxGeometry args={[0.08, 0.06, 0.14]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// ── Scene ─────────────────────────────────────────────────────────────────────
function Scene() {
  const mousePos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const [flicker, setFlicker]       = useState<number>(1.0);
  const [screenGlow, setScreenGlow] = useState<number>(1.0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mousePos.current.x =  (e.clientX / window.innerWidth)  * 2 - 1;
      mousePos.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    setFlicker(0.92 + Math.sin(t * 7.3) * 0.04 + Math.sin(t * 13.7) * 0.02);
    setScreenGlow(0.9 + Math.sin(t * 0.8) * 0.1);
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[1.6, 1.85, 2.8]} fov={42} />
      <OrbitControls
        enablePan={false}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2.2}
        minDistance={2.5}
        maxDistance={5}
        target={[0, 0.9, 0]}
        enableDamping
        dampingFactor={0.05}
      />
      <ambientLight color="#b8c8e8" intensity={0.35} />
      <directionalLight
        position={[-2.5, 3, -2]}
        color="#4a6fa5"
        intensity={0.55}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={12}
      />
      <pointLight position={[2, 2.5, 2.5]} color="#fff5e4" intensity={0.3} distance={6} />

      <Environment3D />
      <Desk />
      <Chair />
      <Laptop screenGlow={screenGlow} />
      <Notebook />
      <Pen handY={0} />
      <CoffeeMug />
      <BookStack />
      <DeskLamp flicker={flicker} />
      <SmallPlant />
      <Student mousePos={mousePos} />
      <DustParticles />
    </>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────
export default function StudentDeskScene() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(135deg, #0d1117 0%, #1a1f2e 50%, #0d1117 100%)",
        fontFamily: "Georgia, serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 24,
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        <p
          style={{
            color: "rgba(255,220,160,0.7)",
            fontSize: 12,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          Move cursor to make him look at you
        </p>
      </div>

      <Canvas
        shadows
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
        }}
      >
        <Scene />
      </Canvas>

      <div
        style={{
          position: "absolute",
          bottom: 20,
          right: 24,
          color: "rgba(255,200,120,0.45)",
          fontSize: 11,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          pointerEvents: "none",
        }}
      >
        Student Study Scene · Three.js
      </div>
    </div>
  );
}