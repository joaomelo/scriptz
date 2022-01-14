import yargs from "yargs";
import { hideBin } from "yargs/helpers";

export function evaluateArgument(name) {
  const args = yargs(hideBin(process.argv)).argv;
  return args[name];
}

export function complementCommandWithArguments(script) {
  if (!script.args) return script.command;

  const args = yargs(hideBin(process.argv)).argv._;
  console.log({ args });
  if (!Array.isArray(args) || args.length === 0) return script.command;

  const parts = [script.command].concat(args);
  return parts.join(" ");
}
