import * as THREE from "three";
import {
  MeshPortalMaterial,
  RoundedBox,
  Text,
  useTexture,
} from "@react-three/drei";
import Lights from "./Lights";

type MonsterStageProps = {
  children: React.ReactNode;
  texture: string;
  name: string;
  color: string;
  active: string;
  setActive: (name: string | null) => void;
};

const MonsterStage = ({
  children,
  texture,
  name,
  color,
  active,
  setActive,
  ...props
}: MonsterStageProps) => {
  const map = useTexture(texture);

  return (
    <group {...props}>
      <Text fontSize={0.35} position={[0, -1.4, 0.051]} anchorY={"bottom"}>
        {name}
        <meshBasicMaterial color={color} toneMapped={false} />
      </Text>
      <RoundedBox
        args={[2, 3, 0.1]}
        onDoubleClick={() => setActive(active === name ? null : name)}
      >
        <MeshPortalMaterial blend={active === name ? 1 : 0}>
          {/* <MeshPortalMaterial side={THREE.DoubleSide}> */}

          {children}

          <mesh>
            <Lights intensity={1} />
            <sphereGeometry args={[5, 64, 64]} />
            <meshStandardMaterial map={map} side={THREE.BackSide} />
          </mesh>
        </MeshPortalMaterial>
      </RoundedBox>
    </group>
  );
};

export default MonsterStage;
