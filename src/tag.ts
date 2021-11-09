import readline from "readline";
import { Readable } from "stream";

export function createTag(taggable: Taggable): string {
  const bgColor = taggable.bgColor || Reset;
  const textColor = taggable.textColor || Reset;
  const { name } = taggable;
  const tag = `${bgColor}${textColor}[${name}]${Reset} `;
  return tag;
}

export function tagToConsole(tag: string, stream: Readable) {
  const rl = readline.createInterface({
    input: stream,
    terminal: false,
  });
  rl.on("line", (line) => console.info(`${tag}${line}`));
}
