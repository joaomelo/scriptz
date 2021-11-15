import { Command, Composition } from "sqript";

export const test: Command = {
  name: "test",
  instruction: "jest",
};

export const qualityControl: Composition = {
  name: "quality-control",
  mode: "RELAY",
  scripts: [
    {
      name: "lint",
      instruction: "npx eslint . --ext .js,.jsx,.ts,.tsx",
    },
    test,
  ],
};

export const compile: Composition = {
  name: "compile",
  mode: "RELAY",
  scripts: [
    {
      name: "clean",
      instruction: "npx rimraf dist/*",
    },
    {
      name: "tsc",
      instruction: "tsc",
    },
  ],
};

export const deploy: Composition = {
  name: "deploy",
  mode: "RELAY",
  scripts: [
    compile,
    {
      name: "publish",
      instruction: "npm publish",
    },
  ],
};
