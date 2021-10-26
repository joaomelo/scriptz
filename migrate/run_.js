import { spawn } from 'child_process';
import { readFileSync } from 'fs';
import readline from 'readline';
import path from 'path';
import dotenv from 'dotenv';
import { colors } from './colors.js';

async function race(raceScript) {
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

function parseEnv({
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
