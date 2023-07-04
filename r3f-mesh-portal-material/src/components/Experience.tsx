import { useState } from "react";
import { OrbitControls } from "@react-three/drei";
import Lights from "./Lights";
import { Fish } from "./Fish";
import { Dragon } from "./Dragon";
import { Cactoro } from "./Cactoro";
import MonsterStage from "./MonsterStage";

export default function Experience() {
  const [active, isActive] = useState<null | string>(null);

  return (
    <>
      <OrbitControls makeDefault />
      <Lights />
      <MonsterStage
        texture={"/textures/water.jpg"}
        name="Water"
        color={"#006994"}
        active={active}
        setActive={isActive}
      >
        <Fish scale={0.6} position-y={-1} />
      </MonsterStage>

      <MonsterStage
        texture={"/textures/fire.jpg"}
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
