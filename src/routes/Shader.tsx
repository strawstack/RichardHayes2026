import * as THREE from "three";
import { Canvas, useThree } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";

function FullscreenQuad() {
  const { viewport } = useThree();

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial color="red" />
    </mesh>
  );
}

export function Shader() {
  return (
    <Canvas>
      <OrthographicCamera
        makeDefault
        top={1}
        bottom={-1}
        left={-1}
        right={1}
        near={-1}
        far={1}
      />
      <FullscreenQuad />
    </Canvas>
  );
}
