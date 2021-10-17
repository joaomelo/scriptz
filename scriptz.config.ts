import {
  BgColor,
  Command,
  scriptz,
  TextColor,
} from "https://deno.land/x/scriptz@0.0.1/index.ts";
// } from './src/index.ts';

export const firebaseEmulators: Command = {
  name: "emulators",
  instruction: "firebase emulators:start",
  textColor: TextColor.White,
  bgColor: BgColor.Yellow,
};

export const echo: Command = {
  name: "echo",
  instruction: 'echo "sxz"',
  textColor: TextColor.Black,
  bgColor: BgColor.White,
};

scriptz([firebaseEmulators, echo]);
