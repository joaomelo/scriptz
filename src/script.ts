import { BgColor, TextColor } from "./colors";

export type Script = Command | Composition;

export interface Taggable {
  name: string;
  textColor?: TextColor;
  bgColor?: BgColor;
}

export interface Command extends Taggable {
  instruction: string;
  envFile?: string;
  envVars?: Record<string, string>;
};

export interface Composition extends Taggable {
  mode: "SERIAL" | "PARALLEL" | "RACE";
  scripts: Script[];
}
