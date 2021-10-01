import { TextColor, BgColor } from './colors';

export type Script = Command | Composition;

export type Command = {
  name: string
  instruction: string,
  envFile?: string,
  envVars?: Record<string, string>,
  textColor?: TextColor,
  bgColor?: BgColor
}

export type Composition = {
  name: string,
  scripts: Script[];
  mode: Mode;
}

export enum Mode {
  Serial = 'SERIAL',
  Parallel = 'PARALLEL',
  Race = 'RACE'
}

