import { Command, Composition } from "sqript";

export const lint: Command = {
  name: "lint",
  instruction: "npx eslint . --ext .js,.jsx,.ts,.tsx",
  styles: ["bgWhite", "yellow"],
};

export const testDev: Command = {
  name: "test-dev",
  instruction: "jest --coverage=false",
  styles: ["bgGreenBright", "whiteBright"],
};

export const testCi: Command = {
  name: "test-ci",
  instruction: "jest ",
  styles: ["bgGreenBright", "whiteBright"],
};

export const compile: Composition = {
  name: "compile",
  mode: "RELAY",
  styles: ["underline", "blue"],
  scripts: [
    {
      name: "clean",
      instruction: "npx rimraf dist/*",
    },
    {
      name: "tsc",
      instruction: "tsc",
      styles: ["blueBright"],
    },
  ],
};

const publish: Command = {
  name: "publish",
  instruction: "npm publish",
  styles: ["bgRed", "whiteBright"],
};

export const deployFromCi: Composition = {
  name: "deploy-ci",
  mode: "RELAY",
  scripts: [compile, publish],
};

export const deployFromLocal: Composition = {
  name: "deploy-local",
  mode: "RELAY",
  scripts: [
    lint,
    testDev,
    compile,
    {
      name: "patch",
      instruction: "npm version patch",
    },
    publish,
  ],
};

export const syncSqript: Composition = {
  name: "sync",
  mode: "RELAY",
  scripts: [
    {
      name: "pull",
      instruction: "git pull",
    },
    {
      name: "uninstall",
      instruction: "npm un sqript",
    },
    {
      name: "install",
      instruction: "npm i -D sqript",
    },
    {
      name: "add",
      instruction: "git add -A",
    },
    {
      name: "commit",
      instruction: 'git commit -m "chore: [skip ci] updated library version"',
    },
    {
      name: "push",
      instruction: "git push",
    },
  ],
};
