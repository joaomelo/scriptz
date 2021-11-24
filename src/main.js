import { resolve } from "path";
import { obtainNameFromUser } from "./name";
import { run } from "./run";

export async function main() {
  const scripts = await extractUserScripts();

  const scriptsNames = scripts.map(({ name }) => name);
  const chosenName = await obtainNameFromUser(scriptsNames);
  if (!chosenName) return;

  const chosenScript = scripts.find((s) => s.name === chosenName);
  if (!chosenScript) {
    throw new Error(`Could not find script with name ${chosenName}`);
  }

  const runner = run(chosenScript);
  const code = await runner.code;
  process.exit(code);
}

async function extractUserScripts() {
  const fileName = "sqript.js";
  const configFilePath = resolve(process.cwd(), fileName);

  const exportedScripts = await require(configFilePath);
  const scripts = Object.values(exportedScripts);
  return scripts;
}
