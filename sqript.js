export const lint = {
  name: "lint",
  instruction: "npx eslint . --ext .js",
  styles: ["bgWhite", "yellow"],
};

const testStyles = ["bgGreenBright", "whiteBright"];

export const testDev = {
  name: "test-dev",
  instruction: "jest --coverage=false",
  styles: testStyles,
};

export const testCi = {
  name: "test-ci",
  instruction: "jest",
  styles: testStyles,
};

export const publish = {
  name: "publish",
  instruction: "npm publish",
  styles: ["bgRed", "whiteBright"],
};

export const publishLocal = {
  name: "publish-local",
  mode: "RELAY",
  scripts: [
    lint,
    testDev,
    {
      name: "patch",
      instruction: "npm version patch",
    },
    publish,
  ],
};

export const syncSqript = {
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
