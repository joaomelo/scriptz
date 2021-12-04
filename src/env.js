import { resolve } from "path";
import { readFileSync } from "fs";
import { parse } from "dotenv";

export function parseEnv(userConfigs = []) {
  const envConfigs = Array.isArray(userConfigs) ? userConfigs : [userConfigs];

  const parsedEnv = envConfigs.reduce((acc, config) => {
    return {
      ...acc,
      ...solveConfig(config),
    };
  }, {});

  return {
    ...process.env,
    ...parsedEnv,

    /* 
      this env var preserves colors for the user's commands 
      outputs without the need to spawn processes with stdio 
      set to 'inherit'.
      https://stackoverflow.com/a/43375301/7024301
    */
    FORCE_COLOR: "true",
  };
}

function solveConfig(config = {}) {
  if (typeof config === "string") {
    const filePath = resolve(process.cwd(), config);
    const buffer = readFileSync(filePath);
    const envFromFile = parse(buffer);
    return {
      ...envFromFile,
    };
  }

  return {
    ...config,
  };
}
