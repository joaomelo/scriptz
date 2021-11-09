import { spawn } from "child_process";
import { Reset, BgColor, TextColor } from "./colors";
import { Command, RunningScript } from "./script";
import { solveCode } from "./code";
import { createTag, tagToConsole } from "./tag";

export function once(command: Command): Runner {
  const tag = createTag(command);
  console.info(`${tag}started`);

  // const scriptEnv = parseEnv({ file: envFile, vars: envVars });
  const runningProcess = spawn(command.instruction, {
    shell: true,
    // env: scriptEnv
  });

  tagToConsole(tag, runningProcess.stdout);
  tagToConsole(tag, runningProcess.stderr);

  const kill = () => runningProcess.kill();

  const code = new Promise<number>((resolve) => {
    runningProcess.on("close", (rawCode) => {
      const code = solveCode(rawCode);
      console.info(`${tag}exited with code ${finalCode}`);
      resolve(code);
    });
  });

  return {
    kill,
    code,
  };
}
