import { Reset } from "./colors";
import { Script, Command } from './script';

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

function once(command: Command): void {
  const tag = createTag(command);
  console.info(`${tag}started`);
}

// async function once(command: Command, killer: CommandKiller): Promise<number> {
//   return new Promise(resolve => {
//     const tag = `${bgColor}${textColor}[${label}]${colors.reset} `;
//     console.info(`${tag}started`);

//     const scriptEnv = parseEnv({ file: envFile, vars: envVars });
//     const wrappedCommand = `${useNpx ? 'npx ' : ''}${command}`;

//     const runningProcess = spawn(wrappedCommand, {
//       shell: true,
//       env: scriptEnv
//     });

//     killer.kill = () => runningProcess.kill();

//     tagToConsole({ tag, stream: runningProcess.stdout });
//     tagToConsole({ tag, stream: runningProcess.stderr });

//     runningProcess.on('close', code => {
//       console.info(`${tag}exited with code ${code}`);
//       resolve(code);
//     });
//   });

// }

function createTag(command: Command): string {
  const bgColor = command.bgColor || Reset;
  const textColor = command.textColor || Reset;
  const { name } = command;
  const tag = `${bgColor}${textColor}[${name}]${Reset} `;
  return tag;
}
