import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { OrthographicCamera } from "@react-three/drei/core/OrthographicCamera";

const SPEED = 0.5;

function Box({ ...props }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const rand = useMemo(() => {
    const flip = Math.random() < 0.5 ? -1 : 1;
    return (Math.random() * 0.25 + 0.75) * flip;
  }, []);
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * SPEED * rand;
      meshRef.current.rotation.y += delta * SPEED * rand;
    }
  });
  return (
    <mesh {...props} ref={meshRef}>
      <boxGeometry args={[props.size, props.size, props.size]} />
      <meshStandardMaterial color="#2dd4bf" roughness={1} metalness={0} />
    </mesh>
  );
}

function Dodecahedron({ ...props }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const rand = useMemo(() => {
    const flip = Math.random() < 0.5 ? -1 : 1;
    return (Math.random() * 0.25 + 0.75) * flip;
  }, []);
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * SPEED * rand;
      meshRef.current.rotation.y += delta * SPEED * rand;
    }
  });
  return (
    <mesh {...props} ref={meshRef}>
      <dodecahedronGeometry args={[props.size]} />
      <meshStandardMaterial color="#2dd4bf" roughness={1} metalness={0} />
    </mesh>
  );
}

function Cylinder({ ...props }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const rand = useMemo(() => {
    const flip = Math.random() < 0.5 ? -1 : 1;
    return (Math.random() * 0.25 + 0.75) * flip;
  }, []);
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.PI / 4;
      meshRef.current.rotation.y += delta * SPEED * rand;
    }
  });
  return (
    <mesh {...props} ref={meshRef}>
      <cylinderGeometry args={[props.radius, props.radius, props.height, 8]} />
      <meshStandardMaterial color="#2dd4bf" roughness={1} metalness={0} />
    </mesh>
  );
}

type Size = {
  x: number;
  y: number;
};

export function ThreeShape() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [size, setSize] = useState<Size>({ x: 0, y: 0 });
  const ratio = size.x / size.y;
  const top = size.y / (2 * ratio);
  const bottom = -size.y / (2 * ratio);

  useEffect(() => {
    if (canvasRef.current) {
      const { width, height } = canvasRef.current.getBoundingClientRect();
      setSize({
        x: width,
        y: height,
      });
    }
  }, []);

  return (
    <Canvas className="bg-teal-800/20" ref={canvasRef}>
      <ambientLight intensity={Math.PI / 2} />
      <pointLight position={[30, 0, 30]} decay={0} intensity={5} />
      <Box position={[-30, 0, -100]} size={80} />
      <Dodecahedron position={[size.x / 2 - 30, 10, -100]} size={60} />
      <Dodecahedron position={[45, -30, -100]} size={50} />
      <Cylinder position={[-size.x / 2, 20, 0]} radius={120} height={30} />
      <Cylinder position={[140, -30, 0]} radius={40} height={30} />
      <OrthographicCamera
        makeDefault
        zoom={1}
        top={top}
        bottom={bottom}
        left={-size.x / 2}
        right={size.x / 2}
        near={1}
        far={2000}
        position={[0, 0, 100]}
      />
    </Canvas>
  );
}
