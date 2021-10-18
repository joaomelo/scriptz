import {
  BgColor,
  Command,
  TextColor,
} from "https://deno.land/x/scriptz@0.0.5/types.ts";

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
