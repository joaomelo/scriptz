import { join, toFileUrl } from "https://deno.land/std@0.102.0/path/mod.ts";
import { Script } from "./script.ts";
import { obtainNameFromUser } from "./name.ts";
import { run } from "./run.ts";

async function scriptz(): Promise<void> {
  const configFile = resolveConfigFile();
  const userScripts = await import(configFile);
  const scripts = parseUserScripts(userScripts);

  const scriptsNames = scripts.map(({ name }) => name);
  const chosenName = await obtainNameFromUser(scriptsNames);
  const chosenScript = scripts.find((s) => s.name === chosenName);

  if (!chosenScript) {
    throw new Error(`Could not find script with name ${chosenName}`);
  }

  run(chosenScript);
}

function resolveConfigFile() {
  const fileName = "scriptz.config.ts";
  const configFilePath = join(Deno.cwd(), fileName);
  const configFile = toFileUrl(configFilePath).href;
  return configFile;
}

function parseUserScripts(exportedScripts: unknown): Script[] {
  const scripts = Object.values(exportedScripts as Record<string, Script>);
  return scripts;
}

if (import.meta.main) {
  scriptz();
}
