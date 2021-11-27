import readline from "readline";
import { evaluateArgument } from "./arguments.js";
import { applyStyles } from "./styles.js";
import { solveCode } from "./code.js";

export function tag(process, hierarchy) {
  const prefix = createPrefix(hierarchy);

  console.info(`${prefix} starting`);

  if (process.stdout) tagLine(prefix, process.stdout);
  if (process.stderr) tagLine(prefix, process.stderr);
  tagClose(prefix, process);
}

function createPrefix(hierarchy) {
  const length = evaluateArgument("length");

  return hierarchy.reduce((formattedHierarchyNames, script) => {
    const { name, styles } = script;
    const tagText = name
      ? assureLength(name, length)
      : createRandomTagText(length);
    const formattedScriptName = applyStyles(`[${tagText}]`, styles);
    return `${formattedHierarchyNames}${formattedScriptName}`;
  }, "");
}

function tagLine(prefix, stream) {
  const rl = readline.createInterface({
    input: stream,
    terminal: false,
  });
  rl.on("line", (line) => console.info(`${prefix} ${line}`));
}

function tagClose(prefix, process) {
  process.on("close", (rawCode) => {
    const code = solveCode(rawCode);
    console.info(`${prefix} exited with code ${code}`);
  });
}

function assureLength(str, length) {
  if (!length) return str;
  return str.padEnd(length, " ").slice(0, length);
}

function createRandomTagText(length = 5) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const pick = () => chars.charAt(Math.floor(Math.random() * chars.length));

  const filled = Array(length).fill(null);
  return filled.reduce((acc) => acc + pick(), "");
}
