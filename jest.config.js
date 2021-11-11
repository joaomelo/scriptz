/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  clearMocks: true,
  testMatch: ["**/tests/**/?(*.)+(spec|test).ts?(x)"],
};
