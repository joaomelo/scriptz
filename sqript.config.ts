import { Command, Composition } from "sqript";

const lint: Command = {
  name: "lint",
  instruction: "npx eslint . --ext .js,.jsx,.ts,.tsx",
};

export const test: Command = {
  name: "test",
  instruction: "jest",
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

const publish: Command = {
  name: "publish",
  instruction: "npm publish",
};

export const deployPatch: Composition = {
  name: "deploy-patch",
  mode: "RELAY",
  scripts: [
    lint,
    {
      name: "patch",
      instruction: "npm version patch",
    },
    compile,
    publish,
  ],
};

export const deployMinor: Composition = {
  name: "deploy-minor",
  mode: "RELAY",
  scripts: [
    lint,
    {
      name: "minor",
      instruction: "npm version minor",
    },
    compile,
    publish,
  ],
};
