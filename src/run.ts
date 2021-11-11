import { spawn } from "child_process";
import { Script, Composition, Command } from "./script";
import { solveCode } from "./code";
import { tag, Taggable } from "./tag";

type Runner = {
  kill: () => void;
  code: Promise<number>;
};

export function run(script: Script): Runner {
  if (isCommand(script)) return once(script);

  switch (script.mode) {
    case "RELAY":
      return serial(script);
    case "SERIAL":
      return serial(script);
    case "PARALLEL":
      return parallel(script);
    case "RACE":
      return race(script);
  }
}

function isCommand(script: Script): script is Command {
  return (script as Command).instruction !== undefined;
}

export function once(command: Command, parents: Taggable[] = []): Runner {
  // const scriptEnv = parseEnv({ file: envFile, vars: envVars });
  const runningProcess = spawn(command.instruction, {
    shell: true,
    // env: scriptEnv
  });
  tag(runningProcess, [command, ...parents]);

  const kill = () => runningProcess.kill();

  const code = new Promise<number>((resolve) => {
    runningProcess.on("close", (code) => resolve(solveCode(code)));
  });

  return {
    kill,
    code,
  };
}

function serial(composition: Composition): Runner {
  const scriptsQueue = [...composition.scripts];
  let isKilled = false;
  let lastCode = 1;
  let currentRunner: Runner;

  const code = new Promise<number>((resolve) => {
    const stepQueue = async () => {
      const nextScript = scriptsQueue.shift();
      if (!nextScript) {
        resolve(solveCode(lastCode));
      } else if (isKilled) {
        resolve(solveCode(null));
      } else {
        currentRunner = run(nextScript);
        lastCode = await currentRunner.code;
        void stepQueue();
      }
    };
    void stepQueue();
  });

  const kill = () => {
    isKilled = true;
    currentRunner.kill();
  };

  return {
    kill,
    code,
  };
}

function parallel(composition: Composition): Runner {
  // const promises = composition.scripts.map((script) => run(script));

  // const codes = await Promise.all(promises);
  // return codes.every((code) => code === 0) ? 0 : 1;

  return {
    kill: () => {
      console.log({ composition });
    },
    code: Promise.resolve(1),
  };
}

function race(composition: Composition): Runner {
  // const killers = [];
  // const promises = raceScript.compose.map((script) => {
  //   const killer = {};
  //   killers.push(killer);
  //   return run({ ...script, killer });
  // });

  // const exitCode = await Promise.race(promises);
  // killers.forEach((killer) => killer.kill());

  // return exitCode;

  return {
    kill: () => {
      console.log({ composition });
    },
    code: Promise.resolve(1),
  };
}
