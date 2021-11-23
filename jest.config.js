export default {
  testEnvironment: "node",
  clearMocks: true,
  testMatch: [
    "**/src/**/?(*.)+(spec|test).ts?(x)",
    "**/tests/**/?(*.)+(spec|test).ts?(x)",
  ],
  setupFiles: ["./tests/setup-jest.js"],
  collectCoverage: true,
  coverageDirectory: "./tests/coverage",
};
