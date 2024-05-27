import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import state from "../store";
import { useSnapshot } from "valtio";
import { useRef } from "react";

export default function CameraRig({ children }) {
  const groupRef = useRef();
  const snap = useSnapshot(state);

  useFrame((state, delta) => {
    const isBreakPoint = window.innerWidth <= 1260,
      isMobile = window.innerWidth <= 600;

    // set initial position of the modal
    let targetPosition = [-0.4, 0, 2];

    if (snap.intro) {
      if (isBreakPoint) targetPosition = [0, 0, 2];
      if (isMobile) targetPosition = [0, 0, 2.5];
    } else {
      isMobile ? (targetPosition = [0, 0, 2.5]) : (targetPosition = [0, 0, 2]);
    }

    // set model camera position
    easing.damp3(state.camera.position, targetPosition, 0.25, delta);

    // set the modal rotation smoothly
    easing.dampE(
      groupRef.current.rotation,
      [state.pointer.y / 10, -state.pointer.x / 5, 0],
      0.25,
      delta
    );
  });

  return <group ref={groupRef}>{children}</group>;
}
