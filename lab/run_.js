import { spawn } from 'child_process';
import { readFileSync } from 'fs';
import readline from 'readline';
import path from 'path';
import dotenv from 'dotenv';
import { colors } from './colors.js';

export function run (script) {
  if (script.command) return once(script);
  if (script.compose && script.mode === 'serial') return serial(script);
  if (script.compose && script.mode === 'parallel') return parallel(script);
  if (script.compose && script.mode === 'race') return race(script);

  throw new Error('invalid script passed to "run"');
}

function once ({
  command,
  envFile,
  envVars,
  useNpx = false,
  label = command,
  textColor = colors.reset,
  bgColor = colors.reset,
  killer = {}
} = {}) {
  return new Promise(resolve => {
    const tag = `${bgColor}${textColor}[${label}]${colors.reset} `;
    console.info(`${tag}started`);

    const scriptEnv = parseEnv({ file: envFile, vars: envVars });
    const wrappedCommand = `${useNpx ? 'npx ' : ''}${command}`;

    const runningProcess = spawn(wrappedCommand, {
      shell: true,
      env: scriptEnv
    });

    killer.kill = () => runningProcess.kill();

    tagToConsole({ tag, stream: runningProcess.stdout });
    tagToConsole({ tag, stream: runningProcess.stderr });

    runningProcess.on('close', code => {
      console.info(`${tag}exited with code ${code}`);
      resolve(code);
    });
  });
}

async function serial (serialScript) {
  const exitCodes = [];
  for (const script of serialScript.compose) {
    const exitCode = await run(script);
    exitCodes.push(exitCode);
  }
  return exitCodes;
}

async function parallel (parallelScript) {
  const promises = parallelScript
    .compose
    .map(script => run(script));

  const exitCodes = await Promise.all(promises);
  return exitCodes;
}

async function race (raceScript) {
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

function tagToConsole ({ stream, tag }) {
  readline.createInterface({
    input: stream,
    terminal: false
  }).on('line', line => console.info(`${tag}${line}`));
}

function parseEnv ({
  file,
  vars = {}
} = {}) {
  let envFromFile = {};
  if (file) {
    const filePath = path.resolve(process.cwd(), file);
    const buffer = readFileSync(filePath);
    envFromFile = dotenv.parse(buffer);
  }

  return {
    ...process.env,
    ...envFromFile,
    ...vars
  };
}
