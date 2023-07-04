import { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { CameraControls } from "@react-three/drei";
import Lights from "./Lights";
import { Fish } from "./Fish";
import { Dragon } from "./Dragon";
import { Cactoro } from "./Cactoro";
import MonsterStage from "./MonsterStage";
import { useThree } from "@react-three/fiber";

export default function Experience() {
  const [active, isActive] = useState<null | string>(null);
  const controlsRef = useRef<CameraControls>(null);

  const scene = useThree((state) => state.scene);

  useEffect(() => {
    if (active) {
      const targetPosition = new THREE.Vector3();
      const activeObject = scene
        .getObjectByName(active)
        ?.getWorldPosition(targetPosition);

      if (activeObject) {
        controlsRef.current?.setLookAt(
          0,
          0,
          5,
          targetPosition.x,
          targetPosition.y,
          targetPosition.z,
          true
        );
      }
    } else {
      controlsRef.current?.setLookAt(0, 0, 10, 0, 0, 0, true);
    }
  }, [active]);

  return (
    <>
      <CameraControls
        ref={controlsRef}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 6}
      />
      <Lights />

      <MonsterStage
        texture={"/textures/sea.jpg"}
        name="Water"
        color={"#006994"}
        active={active}
        setActive={isActive}
      >
        <Fish scale={0.6} position-y={-1} />
      </MonsterStage>

      <MonsterStage
        texture={"/textures/volcano.jpg"}
        name="Fire"
        color={"#EE4B2B"}
        active={active}
        setActive={isActive}
        position-x={-2.5}
        position-z={0.5}
        rotation-y={Math.PI / 8}
      >
        <Dragon scale={0.6} position-y={-1} />
      </MonsterStage>

      <MonsterStage
        texture={"/textures/desert.jpg"}
        name="Grass"
        color={"#7CFC00"}
        active={active}
        setActive={isActive}
        position-x={2.5}
        position-z={0.5}
        rotation-y={-Math.PI / 8}
      >
        <Cactoro scale={0.6} position-y={-1} />
      </MonsterStage>
    </>
  );
}
