import { Taggable } from "./tag";
export type Script = Command | Composition;

export interface Command extends Taggable {
  instruction: string;
  env?: string | Record<string, string>;
}

export interface Composition extends Taggable {
  mode: "RELAY" | "SERIAL" | "RALLY" | "RACE";
  scripts: Script[];
}
