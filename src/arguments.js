import yargs from "yargs";
import { hideBin } from "yargs/helpers";

export function evaluateArgument(name) {
  const args = yargs(hideBin(process.argv)).argv;
  return args[name];
}
