import { AccumulativeShadows, RandomizedLight } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useRef } from "react";

export default function Backdrop() {
  const shadowsRef = useRef();

  return (
    <AccumulativeShadows
      ref={shadowsRef}
      temporal
      frames={40}
      alphaTest={0.25}
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, 0, -0.15]}
    >
      <RandomizedLight
        amount={4}
        radius={10}
        intensity={0.55}
        ambient={5}
        position={[5, 5, -10]}
      />
      <RandomizedLight
        amount={4}
        radius={10}
        intensity={0.25}
        ambient={0.55}
        position={[-5, 5, -10]}
      />
    </AccumulativeShadows>
  );
}
