import { Script, Command, Composition, RunningScript } from './script';
import { once } from './once';

export function run(script: Script): RunningScript {
  if (isCommand(script)) return once(script)

  switch (script.mode) {
    case "SERIAL": return serial(script);
    case "PARALLEL": return parallel(script);
    case "RACE": return race(script);
  }
}

function isCommand(script: Script): script is Command {
  return (script as Command).instruction !== undefined;
}

function serial(composition: Composition): RunningScript {
  let code = 0;
  for (const script of composition.scripts) {
    code = await run(script);
    if (code !== 0) break;
  }
  return code;
}

async function parallel(composition: Composition): RunningScript {
  const promises = composition
    .scripts
    .map(script => run(script));

  const codes = await Promise.all(promises);
  return codes.every(code => code === 0) ? 0 : 1;
}

async function race(composition: Composition): RunningScript {
  const killers = [];
  const promises = raceScript
    .compose
    .map(script => {
      const killer = {};
      killers.push(killer);
      return run({ ...script, killer });
    });

  const exitCode = await Promise.race(promises);
  killers.forEach(killer => killer.kill());

  return exitCode;
}