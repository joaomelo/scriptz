export default {
  testEnvironment: "node",
  clearMocks: true,
  transform: {}, // required by https://jestjs.io/docs/ecmascript-modules
  testMatch: [
    "**/src/**/?(*.)+(spec|test).js",
    "**/tests/**/?(*.)+(spec|test).js",
  ],
  setupFiles: ["./tests/setup-jest.js"],
  coverageDirectory: "./tests/coverage",
};
