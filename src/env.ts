import { resolve } from "path";
import { readFileSync } from "fs";
import { parse } from "dotenv";

export type EnvConfig = string | Record<string, string>;

export function parseEnv(envConfig: EnvConfig = {}): Record<string, string> {
  let env = {};
  if (typeof envConfig === "string") {
    const filePath = resolve(process.cwd(), envConfig);
    const buffer = readFileSync(filePath);
    const envFromFile = parse(buffer);
    env = {
      ...envFromFile,
    };
  } else {
    env = {
      ...envConfig,
    };
  }

  return {
    ...process.env,
    ...env,
  };
}
