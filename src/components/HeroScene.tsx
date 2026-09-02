import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Environment, Lightformer, Icosahedron, Torus, Box } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function Cluster() {
  const group = useRef<THREE.Group>(null);
  const width = useThree((s) => s.size.width);
  const mobile = width < 768;
  const baseX = mobile ? 0.9 : 2.0;
  const baseY = mobile ? 3.0 : 0.2;
  const scale = mobile ? 0.55 : 0.85;
  useFrame((state, raw) => {
    const dt = Math.min(raw, 0.05);
    if (!group.current) return;
    group.current.rotation.y += dt * 0.25;
    const { x, y } = state.pointer;
    group.current.rotation.x += (y * 0.25 - group.current.rotation.x) * 0.05;
    group.current.position.x += (baseX + x * 0.4 - group.current.position.x) * 0.05;
  });

  return (
    <group ref={group} position={[baseX, baseY, 0]} scale={scale}>
      <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.2}>
        <Icosahedron args={[1.35, 1]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color="#0f2b2a"
            emissive="#0bd6a8"
            emissiveIntensity={0.22}
            roughness={0.25}
            metalness={0.85}
            flatShading
          />
        </Icosahedron>
      </Float>

      <Float speed={2} rotationIntensity={1.2} floatIntensity={1.6}>
        <Torus args={[0.55, 0.16, 20, 60]} position={[2.2, 0.9, -0.6]} rotation={[0.6, 0.3, 0]}>
          <meshStandardMaterial color="#f7b955" roughness={0.3} metalness={0.7} />
        </Torus>
      </Float>

      <Float speed={1.7} rotationIntensity={1} floatIntensity={2}>
        <Box args={[0.7, 0.7, 0.7]} position={[-2.3, -0.7, 0.4]} rotation={[0.4, 0.8, 0.2]}>
          <meshStandardMaterial color="#0bd6a8" roughness={0.35} metalness={0.6} />
        </Box>
      </Float>

      <Float speed={2.4} rotationIntensity={0.8} floatIntensity={2.4}>
        <Icosahedron args={[0.36, 0]} position={[1.6, -1.5, 0.8]}>
          <meshStandardMaterial color="#e7e3da" roughness={0.5} metalness={0.3} flatShading />
        </Icosahedron>
      </Float>

      <Float speed={1.2} rotationIntensity={0.5} floatIntensity={1.5}>
        <Torus args={[2.6, 0.02, 8, 120]} rotation={[1.4, 0.2, 0]}>
          <meshStandardMaterial color="#0bd6a8" emissive="#0bd6a8" emissiveIntensity={0.6} />
        </Torus>
      </Float>
    </group>
  );
}

export function HeroScene() {
  return (
    <Canvas
      className="absolute inset-0"
      dpr={[1, 2]}
      camera={{ position: [0, 0, 11], fov: 45 }}
      gl={{ antialias: true }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 6, 5]} intensity={1.4} />
      <pointLight position={[-6, -3, 2]} intensity={30} color="#0bd6a8" />
      <Suspense fallback={null}>
        <Cluster />
        <Environment>
          <Lightformer intensity={2} position={[0, 5, 2]} scale={[10, 10, 1]} />
          <Lightformer
            intensity={1.2}
            color="#0bd6a8"
            position={[-5, 1, -1]}
            rotation-y={Math.PI / 2}
            scale={[20, 1, 1]}
          />
        </Environment>
      </Suspense>
    </Canvas>
  );
}

export default HeroScene;
