import { test, expect } from "@playwright/test";
import { run } from "../src/run";

test.describe("command scripts", () => {
  test("successfully run", async () => {
    const command = {
      name: "command",
      instruction: "node -v",
    };

    const runner = run(command);
    const code = await runner.code;
    expect(code).toBe(0);
  });

  test("can catch the exit code multiple times", async () => {
    const command = {
      name: "command",
      instruction: "node -v",
    };

    const runner = run(command);
    const code = await runner.code;
    const secondCode = await runner.code;

    expect(code).toBe(0);
    expect(secondCode).toBe(0);
  });

  test("correctly catch exotic codes", async () => {
    const command = {
      name: "command",
      instruction: "node tests/fixtures/exit-ten",
    };

    const runner = run(command);
    const code = await runner.code;
    expect(code).toBe(10);
  });

  test("captures code even when command throws", async () => {
    const command = {
      name: "command",
      instruction: "node tests/fixtures/throw",
    };

    const runner = run(command);
    const code = await runner.code;
    expect(code).toBe(1);
  });

  test("when arbitrarily killed returns 1 for exit code", async () => {
    const command = {
      name: "command",
      instruction: "node tests/fixtures/forever",
    };

    const runner = run(command);
    runner.kill();
    const code = await runner.code;

    expect(code).toBe(1);
  });
});
