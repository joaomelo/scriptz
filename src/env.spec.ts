import { run } from "./run";

describe("env injection", () => {
  const expectCallWith = (s: string) =>
    expect(global.console.info).toBeCalledWith(expect.stringContaining(s));

  test("can inject from object", async () => {
    const command = {
      name: "command",
      instruction: "node tests/fixtures/info-env",
      env: {
        myStringEnv: "myStringEnv",
      },
    };

    const runner = run(command);
    await runner.code;
    expectCallWith("myStringEnv");
  });

  test("can inject from file", async () => {
    const command = {
      name: "command",
      instruction: "node tests/fixtures/info-env",
      env: "tests/fixtures/info-env.env",
    };

    const runner = run(command);
    await runner.code;
    expectCallWith("MY_STRING_ENV");
  });
});
