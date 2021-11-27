import readline from "readline";
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
  return hierarchy.reduce((formattedHierarchyNames, script) => {
    const { name, styles } = script;
    const tagText = name || createRandomTagText();
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

function createRandomTagText() {
  const text = Array(5).fill(null);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  return text.reduce(
    (acc) => acc + chars.charAt(Math.floor(Math.random() * chars.length)),
    ""
  );
}
