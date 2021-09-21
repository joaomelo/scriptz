import { resolve } from 'path';
import { pathToFileURL } from 'url';

main();

async function main(): Promise<void> {
  const configFilePath = resolve('sxz.config.js');
  const configFileUrl = pathToFileURL(configFilePath);
  const configFileExport = await import(configFileUrl.href);

  console.log(configFileExport);  
}
