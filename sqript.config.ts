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

const publish = {
  name: "publish",
  instruction: "npm publish",
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
    compile,
    {
      name: "patch",
      instruction: "npm version patch",
    },
    publish,
  ],
};

const grand = "grand";
const parent1 = "parent1";
const parent2 = "parent2";
const child21 = "child21";
const child22 = "child22";
export const dummy: Composition = {
  name: grand,
  mode: "RELAY",
  scripts: [
    {
      name: parent1,
      instruction: `echo ${parent1}`,
    },
    {
      name: parent2,
      mode: "RELAY",
      scripts: [
        {
          name: child21,
          instruction: `echo ${child21}`,
        },
        {
          name: child22,
          instruction: `echo ${child22}`,
        },
      ],
    },
  ],
};
