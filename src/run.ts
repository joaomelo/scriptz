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

function once(command: Command): void {
  console.log({ command });
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
