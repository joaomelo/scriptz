import { spawn } from "child_process";
import { Script, Composition, Command } from "./script";
import { solveCode } from "./code";
import { tag, Taggable } from "./tag";

type Runner = {
  kill: () => void;
  code: Promise<number>;
};

export function run(script: Script, parents: Taggable[] = []): Runner {
  if (isCommand(script)) return once(script, parents);

  switch (script.mode) {
    case "RELAY":
      return relay(script, parents);
    case "SERIAL":
      return serial(script, parents);
    case "RALLY":
      return rally(script, parents);
    case "RACE":
      return race(script, parents);
  }
}

function isCommand(script: Script): script is Command {
  return (script as Command).instruction !== undefined;
}

function once(command: Command, parents: Taggable[]): Runner {
  // const scriptEnv = parseEnv({ file: envFile, vars: envVars });
  const runningProcess = spawn(command.instruction, {
    shell: true,
    // env: scriptEnv
  });
  tag(runningProcess, [...parents, command]);

  const kill = () => runningProcess.kill();

  const code = new Promise<number>((resolve) => {
    runningProcess.on("close", (code) => resolve(solveCode(code)));
  });

  return {
    kill,
    code,
  };
}

function relay(composition: Composition, parents: Taggable[]): Runner {
  return sequential(composition, true, parents);
}

function serial(composition: Composition, parents: Taggable[]): Runner {
  return sequential(composition, false, parents);
}

function sequential(
  composition: Composition,
  exitIfFail: boolean,
  parents: Taggable[] = []
): Runner {
  const scriptsQueue = [...composition.scripts];
  let isKilled = false;
  let lastCode = 0;
  let currentRunner: Runner;

  const code = new Promise<number>((resolve) => {
    const stepQueue = async () => {
      const nextScript = scriptsQueue.shift();
      if (!nextScript) {
        resolve(solveCode(lastCode));
      } else if (exitIfFail && lastCode !== 0) {
        resolve(solveCode(lastCode));
      } else if (isKilled) {
        resolve(solveCode(null));
      } else {
        currentRunner = run(nextScript, [...parents, composition]);
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

function rally(composition: Composition, parents: Taggable[]): Runner {
  return parallel(composition, false, parents);
}

function race(composition: Composition, parents: Taggable[]): Runner {
  return parallel(composition, true, parents);
}

function parallel(
  composition: Composition,
  exitEarly: boolean,
  parents: Taggable[]
): Runner {
  const runners = composition.scripts.map((script) =>
    run(script, [...parents, composition])
  );
  const kill = () => runners.forEach((r) => r.kill());

  const code = new Promise<number>((resolve) => {
    const promises = runners.map((r) => r.code);
    if (exitEarly) {
      void Promise.race(promises).then((code) => {
        kill();
        resolve(solveCode(code));
      });
    } else {
      void Promise.all(promises).then((codes) => {
        const code = codes.every((c) => c === 0) ? 0 : 1;
        resolve(solveCode(code));
      });
    }
  });

  return {
    kill,
    code,
  };
}
