import { BgColor, Command, scriptz, TextColor } from "./src/index.ts"; // make external

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

scriptz([firebaseEmulators, echo]); // como importar dinamicamente?
