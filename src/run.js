import { spawn } from "child_process";
import { complementCommandWithArguments } from "./arguments.js";
import { TYPES, resolveType } from "./types.js";
import { solveCode } from "./code.js";
import { parseEnv } from "./env.js";
import { tag } from "./tag.js";
import treeKill from "tree-kill";

export function run(script, parents = []) {
  const type = resolveType(script);

  switch (type) {
    case TYPES.COMMAND:
      return command(script, parents);
    case TYPES.RELAY:
      return relay(script, parents);
    case TYPES.SERIAL:
      return serial(script, parents);
    case TYPES.RALLY:
      return rally(script, parents);
    case TYPES.RACE:
      return race(script, parents);
    default:
      throw new Error("Could not recognize script type");
  }
}

function command(script, parents) {
  const finalCommand = complementCommandWithArguments(script);

  const runningProcess = spawn(finalCommand, {
    shell: true,
    env: parseEnv(script.env),
  });

  tag(runningProcess, [...parents, script]);

  const kill = () => treeKill(runningProcess.pid);
  const code = new Promise((resolve) => {
    runningProcess.on("close", (code) => resolve(solveCode(code)));
  });

  return {
    kill,
    code,
  };
}

function relay(script, parents) {
  return sequential(script, TYPES.RELAY.toLowerCase(), true, parents);
}

function serial(script, parents) {
  return sequential(script, TYPES.SERIAL.toLowerCase(), false, parents);
}

function sequential(script, childrenProp, exitIfFail, parents) {
  const scriptsQueue = [...script[childrenProp]];
  let isKilled = false;
  let lastCode = 0;
  let currentRunner;

  const code = new Promise((resolve) => {
    const stepQueue = async () => {
      const nextScript = scriptsQueue.shift();
      if (!nextScript) {
        resolve(solveCode(lastCode));
      } else if (exitIfFail && lastCode !== 0) {
        resolve(solveCode(lastCode));
      } else if (isKilled) {
        resolve(solveCode(null));
      } else {
        currentRunner = run(nextScript, [...parents, script]);
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

function rally(script, parents) {
  return parallel(script, TYPES.RALLY.toLowerCase(), false, parents);
}

function race(script, parents) {
  return parallel(script, TYPES.RACE.toLowerCase(), true, parents);
}

function parallel(script, childrenProp, exitEarly, parents) {
  const childrenRunners = script[childrenProp].map((child) =>
    run(child, [...parents, script])
  );
  const kill = () => childrenRunners.forEach((r) => r.kill());

  const code = new Promise((resolve) => {
    const childrenCodePromises = childrenRunners.map((r) => r.code);
    if (exitEarly) {
      void Promise.race(childrenCodePromises).then((code) => {
        kill();
        resolve(solveCode(code));
      });
    } else {
      void Promise.all(childrenCodePromises).then((codes) => {
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
