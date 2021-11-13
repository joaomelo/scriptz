/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  clearMocks: true,
  testMatch: [
    "**/src/**/?(*.)+(spec|test).ts?(x)",
    "**/tests/**/?(*.)+(spec|test).ts?(x)",
  ],
  setupFiles: ["./tests/setup-jest.js"],
};
