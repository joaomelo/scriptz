import { prompt } from 'enquirer';
import { Script } from './types';
import { obtainName } from './menu';

export async function sxz(scripts: Script[]): Promise<void> {
  const names = scripts.map(({ name } ) => name);
  const name = await obtainName(names);
  
  const script = scripts.find(s => s.name === name);

  console.log(script);
}
