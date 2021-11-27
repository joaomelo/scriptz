export const lint = {
  name: "lint",
  command: "eslint . --ext .js",
  styles: ["bgWhite", "yellow"],
};

const testTemplate = {
  styles: ["bgGreenBright", "whiteBright"],
};

export const testDev = {
  name: "test-dev",
  command: "jest",
  ...testTemplate,
};

export const testCi = {
  name: "test-ci",
  command: "jest --coverage",
  ...testTemplate,
};

export const publish = {
  name: "publish",
  command: "npm publish",
  styles: ["bgRed", "whiteBright"],
};

export const publishLocal = {
  name: "publish-local",
  relay: [
    lint,
    testDev,
    {
      name: "patch",
      command: "npm version patch",
    },
    publish,
  ],
};

export const syncSqript = {
  name: "sync",
  relay: [
    { command: "git pull" },
    { command: "npm un sqript" },
    { command: "npm i -D sqript" },
    { command: "git add -A" },
    { command: 'git commit -m "chore: [skip ci] updated library version"' },
    { command: "git push" },
  ],
};
