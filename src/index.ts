import { join } from 'path';

main();

async function main(): Promise<void> {
  const configFile = join(process.cwd(), 'sxz.config.js')
  console.log({ configFile });  
  const configExport = await import(configFile);
  console.log({ configExport });  
}

