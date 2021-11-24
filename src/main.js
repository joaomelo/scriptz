import { obtainNameFromUser } from "./name.js";
import { extractUserScripts } from "./script.js";
import { run } from "./run.js";

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
