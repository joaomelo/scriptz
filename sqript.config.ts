import {
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

const lint: Command = {
  name: "lint",
  instruction: "npx eslint . --ext .js,.jsx,.ts,.tsx"
}

const publish: Command = {
  name: "publish",
  instruction: "npm publish",
};

export const deployPatch: Composition = {
  name: "deploy-patch",
  mode: "SERIAL",
  scripts: [
    lint,
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
    lint,
    {
      name: "minor",
      instruction: "npm version minor",
    },
    compile,
    publish
  ]
};

export const dummyParallel: Composition = {
  name: 'dummy-parallel',
  mode: 'PARALLEL',
  scripts: [
    {
      name: 'hello',
      instruction: 'echo "world"'
    },
    {
      name: 'hi',
      instruction: 'echo "there"'
    }
  ]
}