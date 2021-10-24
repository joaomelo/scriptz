import {
  BgColor,
  TextColor,
  Command,
  Composition,
} from 'sqript';

const compile: Composition = {
  name: "compile",
  mode: 'SERIAL',
  scripts: [
    {
      name: "clean",
      instruction: "npx rimraf dist/*"
    },
    {
      name: "tsc",
      instruction: 'tsc'
    }
  ]
}

const publish: Command = {
  name: "publish",
  instruction: "npm publish",
};

export const deployPatch: Composition = {
  name: "deploy-patch",
  mode: "SERIAL",
  scripts: [
    {
      name: "patch",
      instruction: "npm version patch",
    },
    compile,
    publish
  ]
};

export const deployMinor: Composition = {
  name: "deploy-minor",
  mode: "SERIAL",
  scripts: [
    {
      name: "minor",
      instruction: "npm version minor",
    },
    compile,
    publish
  ]
};