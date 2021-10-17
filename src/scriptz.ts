import { BgColor, TextColor } from "./colors.ts";
import { Command } from "./script.ts";
import { main } from "./main.ts";

const firebaseEmulators: Command = {
  name: "emulators",
  instruction: "firebase emulators:start",
  textColor: TextColor.White,
  bgColor: BgColor.Yellow,
};

const echo: Command = {
  name: "echo",
  instruction: 'echo "sxz"',
  textColor: TextColor.Black,
  bgColor: BgColor.White,
};

async function scriptz(): Promise<void> {
  await main([firebaseEmulators, echo]);
}

if (import.meta.main) {
  scriptz();
}
