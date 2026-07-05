import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import MugModel from "../models/MugModel";

function ProductViewer() {
  return (
    <div style={{ height: "500px" }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={2} />
        <directionalLight position={[2, 2, 2]} />

        <MugModel />

        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default ProductViewer;