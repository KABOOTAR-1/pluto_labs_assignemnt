import React from "react";
import { BaseEnemy } from "./BaseEnemy";

export const FastEnemy = (props) => (
  <BaseEnemy
    {...props}
    size={0.5}
    color="red"
    speed={5}
    damage={5}
  />
);