import { Taggable } from "./tag";
import { EnvConfig } from "./env";

export type Script = Command | Composition;

export interface Command extends Taggable {
  instruction: string;
  env?: EnvConfig;
}

export interface Composition extends Taggable {
  mode: "RELAY" | "SERIAL" | "RALLY" | "RACE";
  scripts: Script[];
}
