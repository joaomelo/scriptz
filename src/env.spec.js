import { run } from "./run";
import { expectInfoCalledWith } from "../tests/expect";

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
});
