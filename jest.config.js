export default {
  testEnvironment: "node",
  clearMocks: true,
  testMatch: [
    "**/src/**/?(*.)+(spec|test).js",
    "**/tests/**/?(*.)+(spec|test).js",
  ],
  setupFiles: ["./tests/setup-jest.js"],
  coverageDirectory: "./tests/coverage",
};
