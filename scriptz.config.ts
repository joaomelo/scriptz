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

export const hello: Command = {
  name: "echo",
  instruction: ["cmd", "/c", "echo", "hello"],
  textColor: TextColor.White,
  bgColor: BgColor.Black,
};

export const composition: Composition = {
  name: "composition",
  scripts: [hello, firebaseEmulators],
  mode: "SERIAL",
};
