import { TextColor, BgColor } from './colors';

type Script = Command | Composition;

type Command = {
  name: string
  instruction: string,
  useNpx?: boolean,
  envFile?: string,
  envVars?: Record<string, string>,
  label?: string,
  textColor?: TextColor,
  bgColor?: BgColor
}

type Composition = {
  scripts: Script[];
  mode: Mode;
}

enum Mode {
  Serial = 'SERIAL',
  Parallel = 'PARALLEL',
  Race = 'RACE'
}

