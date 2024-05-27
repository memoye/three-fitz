import { Canvas } from "@react-three/fiber";
import { Environment, Center } from "@react-three/drei";
import Shirt from "./Shirt";
import Backdrop from "./Backdrop";
import CameraRig from "./CameraRig";

export default function CanvasModel() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 0], fov: 23 }}
      gl={{ preserveDrawingBuffer: true }}
      className="h-full w-full max-w-full transition-all ease-in"
    >
      <ambientLight intensity={0.5} />
      <Environment preset="city" />

      <CameraRig>
        <Backdrop />
        <Center>
          <Shirt />
        </Center>
      </CameraRig>
    </Canvas>
  );
}
