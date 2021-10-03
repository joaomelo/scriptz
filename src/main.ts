import { Script } from './types';
import { obtainName } from './menu';
import { run } from './run';

export async function sxz(scripts: Script[]): Promise<void> {
  const names = scripts.map(({ name } ) => name);
  const name = await obtainName(names);
  
  const script = scripts.find(s => s.name === name);
  if (!script) {
    throw new Error(`Could not find script with name ${name}`);
  }

  run(script);
}
