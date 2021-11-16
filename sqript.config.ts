import { Command, Composition, Styles } from "sqript";

export const test: Command = {
  name: "test",
  instruction: "jest",
  styles: ["bgGreenBright", "whiteBright"],
};

export const qualityControl: Composition = {
  name: "quality-control",
  mode: "RELAY",
  scripts: [
    {
      name: "lint",
      instruction: "npx eslint . --ext .js,.jsx,.ts,.tsx",
      styles: ["bgWhite", "yellow"],
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
      styles: ["blueBright"],
    },
  ],
};

const publish: Command = {
  name: "publish",
  instruction: "npm publish",
  styles: ["bgRed", "whiteBright"],
};

export const deployCi: Composition = {
  name: "deploy-ci",
  mode: "RELAY",
  scripts: [compile, publish],
};

export const deployLocal: Composition = {
  name: "deploy-local",
  mode: "RELAY",
  scripts: [
    qualityControl,
    compile,
    {
      name: "patch",
      instruction: "npm version patch",
    },
    publish,
  ],
};

export const dummy: Composition = {
  name: "dummy",
  mode: "RELAY",
  styles: ["bgMagentaBright", "whiteBright"],
  scripts: [
    {
      name: "parent1",
      instruction: "echo parent1",
    },
    {
      name: "parent2",
      mode: "RELAY",
      scripts: [
        {
          name: "child21",
          instruction: "echo child21",
        },
        {
          name: "child22",
          instruction: "echo child22",
        },
      ],
    },
  ],
};
