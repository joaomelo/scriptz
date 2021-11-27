import { existsSync } from "fs";
import { resolve } from "path";
import { pathToFileURL } from "url";
import { evaluateArgument } from "./arguments.js";

export async function extractUserScriptsFromConfigFile() {
  const candidates = mountCandidatesConfigFileUrls();
  const valid = electConfigFile(candidates);
  if (!valid) throw new Error(`Could not find a valid config file`);
  const scripts = await parseScriptsFromConfigFile(valid);
  return scripts;
}

function mountCandidatesConfigFileUrls() {
  const userConfig = evaluateArgument("config");

  let rawPaths;
  if (userConfig) {
    rawPaths = [userConfig];
  } else {
    const prime = "sqript.config";
    const exts = ["js", "mjs"];
    rawPaths = exts.map((ext) => resolve(process.cwd(), `${prime}.${ext}`));
  }

  const urls = rawPaths.map((p) => pathToFileURL(p));
  return urls;
}

function electConfigFile(candidates) {
  return candidates.find((url) => existsSync(url));
}

async function parseScriptsFromConfigFile(url) {
  const exportedScripts = await import(url);
  const scripts = Object.values(exportedScripts);
  return scripts;
}
