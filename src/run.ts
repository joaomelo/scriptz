import { Script, Command } from './script';

export async function run(script: Script): Promise<void> {
  console.log(script);
}

async function once(command: Command, killer: CommandKiller): Promise<number> {

}