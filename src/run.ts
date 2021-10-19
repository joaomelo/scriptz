import { Reset } from "./colors.ts";
import { Command, Script } from "./script.ts";

export function run(script: Script): void {
  if (isCommand(script)) {
    once(script);
  } else {
    console.log("not command");
  }
}

function isCommand(script: Script): script is Command {
  return (script as Command).instruction !== undefined;
}

async function once(command: Command): Promise<void> {
  const tag = createTag(command);
  console.info(`${tag}started`);

  const { code } = await Deno.run({
    cmd: ["firebase", "emulators:start"],
    // cmd: command.instruction,
  }).status();

  console.info(`${tag}exited with code ${code}`);
}

function createTag(command: Command): string {
  const bgColor = command.bgColor || Reset;
  const textColor = command.textColor || Reset;
  const { name } = command;
  const tag = `${bgColor}${textColor}[${name}]${Reset} `;
  return tag;
}
