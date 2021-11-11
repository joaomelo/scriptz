import readline from "readline";
import { Readable } from "stream";
import { ChildProcessWithoutNullStreams } from "child_process";
import { Reset, BgColor, TextColor } from "./colors";
import { solveCode } from "./code";
export interface Taggable {
  name: string;
  textColor?: TextColor;
  bgColor?: BgColor;
}

export function tag(
  process: ChildProcessWithoutNullStreams,
  parents: Taggable[]
) {
  const prefix = createPrefix(parents);

  console.info(`${prefix} starting`);

  tagLine(prefix, process.stdout);
  tagLine(prefix, process.stderr);
  tagClose(prefix, process);
}

function createPrefix(parents: Taggable[]): string {
  return parents.reduce((acc, cur) => {
    const bgColor = cur.bgColor || Reset;
    const textColor = cur.textColor || Reset;
    const { name } = cur;
    const part = `${bgColor}${textColor}[${name}]${Reset}`;
    return `${part}${acc}`;
  }, "");
}

function tagLine(prefix: string, stream: Readable) {
  const rl = readline.createInterface({
    input: stream,
    terminal: false,
  });
  rl.on("line", (line) => console.info(`${prefix} ${line}`));
}

function tagClose(prefix: string, process: ChildProcessWithoutNullStreams) {
  process.on("close", (rawCode) => {
    const code = solveCode(rawCode);
    console.info(`${prefix} exited with code ${code}`);
  });
}
