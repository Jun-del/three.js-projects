import { useRef } from "react";
import * as THREE from "three";
import {
  MeshPortalMaterial,
  PortalMaterialType,
  RoundedBox,
  Text,
  useTexture,
} from "@react-three/drei";
import Lights from "./Lights";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";

type MonsterStageProps = {
  children: React.ReactNode;
  texture: string;
  name: string;
  color: string;
  active: string | null;
  setActive: (name: string | null) => void;
  hovered: null | string | boolean;
  setHovered: (name: string | null) => void;
};

const MonsterStage = ({
  children,
  texture,
  name,
  color,
  active,
  setActive,
  hovered,
  setHovered,
  ...props
}: MonsterStageProps) => {
  const map = useTexture(texture);
  const portalMaterial = useRef<PortalMaterialType | null>(null);

  useFrame((_state, delta) => {
    const worldOpen = active === name;
    if (portalMaterial.current) {
      easing.damp(
        portalMaterial.current,
        "blend",
        worldOpen ? 1 : 0,
        0.2,
        delta
      );
    }
  });

  return (
    <group {...props}>
      <Text fontSize={0.35} position={[0, -1.4, 0.051]} anchorY={"bottom"}>
        {name}
        <meshBasicMaterial color={color} toneMapped={false} />
      </Text>
      <RoundedBox
        name={name}
        args={[2, 3, 0.1]}
        onDoubleClick={() => setActive(active === name ? null : name)}
        onPointerEnter={() => setHovered(name)}
        onPointerLeave={() => setHovered(null)}
      >
        <MeshPortalMaterial
          ref={portalMaterial}
          // blend={active === name ? 1 : 0}
        >
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
