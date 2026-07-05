import { useGLTF } from "@react-three/drei";

function MugModel() {
  const { scene } = useGLTF("/models/mug.glb");

  return (
    <primitive
      object={scene}
      scale={1}
      position={[0, 0, 0]}
    />
  );
}

export default MugModel;