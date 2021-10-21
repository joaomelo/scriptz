import { resolve } from 'path';
import { pathToFileURL } from 'url';
import { register } from 'ts-node';
import { Script } from './script';
import { obtainNameFromUser } from "./name";
import { run } from './run';

main();

async function main(): Promise<void> {
  const configFile = resolveConfigFile();
  const scripts = await extractUserScripts(configFile);

  const scriptsNames = scripts.map(({ name }) => name);
  const chosenName = await obtainNameFromUser(scriptsNames);
  const chosenScript = scripts.find((s) => s.name === chosenName);

  if (!chosenScript) {
    throw new Error(`Could not find script with name ${chosenName}`);
  }

  run(chosenScript);
}

function resolveConfigFile() {
  const fileName = "sqript.config.ts";
  const configFilePath = resolve(process.cwd(), fileName);
  return configFilePath;
}

async function extractUserScripts(configFile: string): Promise<Script[]> {
  register();
  const exportedScripts = await require(configFile);
  console.log({ exportedScripts });
  const scripts = Object.values(exportedScripts as Record<string, Script>);
  console.log({ scripts });

  return scripts;
}
