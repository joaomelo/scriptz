import { prompt } from 'enquirer';
import { Script } from './types';

export async function sxz(scripts: Script[]): Promise<void> {
  const names = scripts.map(({ name } ) => name);
  const name = await determineName(names);
  
  console.log({ name });
}

async function determineName(names: string[]): Promise<string> {
  const response = await prompt({
    type: 'select',
    name: 'script',
    message: 'Choose a script to run',
    choices: names
  });

  if (! response has script) then throw;
  
  const name = response.script;
  return name;
}