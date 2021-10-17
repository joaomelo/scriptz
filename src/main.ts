import { Script } from "./script.ts";
import { obtainNameFromUser } from "./name.ts";
import { run } from "./run.ts";

export async function scriptz(scripts: Script[]): Promise<void> {
  const names = scripts.map(({ name }) => name);
  const name = await obtainNameFromUser(names);

  const script = scripts.find((s) => s.name === name);
  if (!script) {
    throw new Error(`Could not find script with name ${name}`);
  }

  run(script);
}
