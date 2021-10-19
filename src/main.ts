import { join } from 'path';
import { pathToFileURL } from 'url';
import { Script } from './script';
import { obtainNameFromUser } from "./name";
import { run } from './run';

main();

async function main(): Promise<void> {
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
  const configFilePath = join(process.cwd(), fileName);
  const configFile = pathToFileURL(configFilePath).href;
  return configFile;
}

function parseUserScripts(exportedScripts: unknown): Script[] {
  const scripts = Object.values(exportedScripts as Record<string, Script>);
  return scripts;
}


