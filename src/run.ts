import { Script } from "./script.ts";

export function run(script: Script): void {
  console.log(script);
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
