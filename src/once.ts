import { Readable } from 'stream';
import { spawn } from 'child_process';
import readline from 'readline';
import { Reset, BgColor, TextColor } from "./colors";
import { Command, RunningScript } from './script';


export function once(command: Command): RunningScript {
  const tag = createTag(command);
  console.info(`${tag}started`);

  // const scriptEnv = parseEnv({ file: envFile, vars: envVars });

  const runningProcess = spawn(command.instruction, {
    shell: true
    // env: scriptEnv
  });

  const kill = () => runningProcess.kill();

  tagToConsole(tag, runningProcess.stdout);
  tagToConsole(tag, runningProcess.stderr);

  const code = new Promise<number>(resolve => {
    runningProcess.on('close', code => {
      const finalCode = code === null ? 1 : code;
      console.info(`${tag}exited with code ${finalCode}`);
      resolve(finalCode);
    });
  });

  return {
    kill,
    code
  }
}




function tagToConsole(tag: string, stream: Readable) {
  const rl = readline.createInterface({
    input: stream,
    terminal: false
  })
  rl.on('line', line => console.info(`${tag}${line}`));
}
