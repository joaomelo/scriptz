export const lint = {
  command: "eslint . --ext .js",
  styles: ["bgWhite", "yellow"],
};

const testTemplate = (params) => ({
  styles: ["bgGreenBright", "whiteBright"],
  command: `jest ${params}`,
});
export const testDev = { ...testTemplate };
export const testCi = { ...testTemplate("--coverage") };

export const publish = {
  command: "npm publish",
  styles: ["bgRed", "whiteBright"],
};

export const publishLocal = {
  relay: [lint, testDev, { command: "npm version patch" }, publish],
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
