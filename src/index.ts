import { Script } from './types';

export async function sxz(scripts: Script[]): Promise<void> {
  scripts.forEach(script => console.log(script));
}
