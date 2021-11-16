import readline from "readline";
import { Readable } from "stream";
import { ChildProcess } from "child_process";
import { applyStyles, Styles } from "./styles";
import { solveCode } from "./code";

export interface Taggable {
  name: string;
  styles?: Styles;
}

export function tag(process: ChildProcess, parents: Taggable[]) {
  const prefix = createPrefix(parents);

  console.info(`${prefix} starting`);

  if (process.stdout) tagLine(prefix, process.stdout);
  if (process.stderr) tagLine(prefix, process.stderr);
  tagClose(prefix, process);
}

function createPrefix(parents: Taggable[]): string {
  return parents.reduce((acc, cur) => {
    const { name, styles } = cur;
    const part = applyStyles(`[${name}]`, styles);
    return `${acc}${part}`;
  }, "");
}

function tagLine(prefix: string, stream: Readable) {
  const rl = readline.createInterface({
    input: stream,
    terminal: false,
  });
  rl.on("line", (line) => console.info(`${prefix} ${line}`));
}

function tagClose(prefix: string, process: ChildProcess) {
  process.on("close", (rawCode) => {
    const code = solveCode(rawCode);
    console.info(`${prefix} exited with code ${code}`);
  });
}
