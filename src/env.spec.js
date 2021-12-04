import { run } from "./run.js";
import { expectInfoCalledWith } from "../tests/expect.js";

describe("env injection", () => {
  test("can inject from object", async () => {
    const runner = run({
      name: "command",
      command: "node tests/fixtures/info-env",
      env: { myStringEnv: "myStringEnv" },
    });
    await runner.code;
    expectInfoCalledWith("myStringEnv");
  });

  test("can inject from file", async () => {
    const runner = run({
      name: "command",
      command: "node tests/fixtures/info-env",
      env: "tests/fixtures/info-env.env",
    });
    await runner.code;
    expectInfoCalledWith("MY_STRING_ENV");
  });

  test("can resiliently inject from multiple sources using arrays", async () => {
    const runner = run({
      name: "command",
      command: "node tests/fixtures/info-env",
      env: [
        null,
        undefined,
        { myStringEnv: "myStringEnv" },
        "tests/fixtures/info-env.env",
      ],
    });
    await runner.code;
    expectInfoCalledWith("MY_STRING_ENV");
    expectInfoCalledWith("myStringEnv");
  });
});
