import { Script, Composition, Command } from "./script";
import { solveCode } from "./code";
import { once } from "./once";

type Runner = {
  kill: () => void;
  code: Promise<number>;
};

export function run(script: Script): Runner {
  if (isCommand(script)) return once(script);

  switch (script.mode) {
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
  return {
    kill: () => {
      console.log({ composition });
    },
    code: Promise.resolve(1),
  };
}

function race(composition: Composition): Runner {
  return {
    kill: () => {
      console.log({ composition });
    },
    code: Promise.resolve(1),
  };
}
