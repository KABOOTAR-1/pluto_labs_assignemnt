import React from "react";
import { BaseEnemy } from "./BaseEnemy";

export const TankEnemy = (props) => (
  <BaseEnemy
    {...props}
    size={2}
    color="green"
    speed={1}
    damage={20}
  />
);