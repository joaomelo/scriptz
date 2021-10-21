import {
  BgColor,
  Command,
  Composition,
  TextColor,
} from 'sqript';

export const firebase: Command = {
  name: "firebase",
  instruction: "firebase init",
  textColor: TextColor.White,
  bgColor: BgColor.Yellow,
};

export const git: Command = {
  name: "git",
  instruction: "git add -A",
  textColor: TextColor.Red,
  bgColor: BgColor.White,
};

export const hello: Command = {
  name: "echo",
  instruction: "echo hello",
  textColor: TextColor.White,
  bgColor: BgColor.Black,
};

export const composition: Composition = {
  name: "composition",
  scripts: [hello, git, firebase],
  mode: "SERIAL",
};