import {
  BgColor,
  Command,
  Composition,
  TextColor,
} from "https://deno.land/x/scriptz@0.0.7/types.ts";

export const firebaseEmulators: Command = {
  name: "emulators",
  instruction: ["firebase", "emulators:start"],
  textColor: TextColor.White,
  bgColor: BgColor.Yellow,
};

export const echo: Command = {
  name: "echo",
  instruction: ["echo", "sxz"],
  textColor: TextColor.Black,
  bgColor: BgColor.White,
};

export const composition: Composition = {
  name: "composition",
  scripts: [echo, firebaseEmulators],
  mode: "SERIAL",
};
