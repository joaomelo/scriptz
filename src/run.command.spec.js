import { run } from "./run.js";

describe("command scripts", () => {
  test("successfully run", async () => {
    const runner = run({
      name: "command",
      command: "node -v",
    });
    const code = await runner.code;
    expect(code).toBe(0);
  });

  test("can catch the exit code multiple times", async () => {
    const runner = run({
      name: "command",
      command: "node -v",
    });
    const code = await runner.code;
    const secondCode = await runner.code;

    expect(code).toBe(0);
    expect(secondCode).toBe(0);
  });

  test("correctly catch exotic codes", async () => {
    const runner = run({
      name: "command",
      command: "node tests/fixtures/exit-ten",
    });
    const code = await runner.code;
    expect(code).toBe(10);
  });

  test("captures code even when command throws", async () => {
    const runner = run({
      name: "command",
      command: "node tests/fixtures/throw",
    });
    const code = await runner.code;
    expect(code).toBe(1);
  });

  test("when arbitrarily killed returns 1 for exit code", async () => {
    const runner = run({
      name: "command",
      command: "node tests/fixtures/forever",
    });
    runner.kill();
    const code = await runner.code;

    expect(code).toBe(1);
  });

  test("can pass down anonymous args if instructed", async () => {
    const runner = run({
      name: "command",
      command: ["echo"],
      args: true,
    });
    runner.kill();
    const code = await runner.code;

    expect(code).toBe(1);
  });
});
