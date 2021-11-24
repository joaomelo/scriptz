import { run } from "./run.js";

describe("rally composition scripts", () => {
  test("exits with 0 if everyone succeeds", async () => {
    const runner = run({
      name: "rally",
      rally: [
        {
          name: "node version",
          command: "node -v",
        },
        {
          name: "node version",
          command: "node -v",
        },
        {
          name: "node version",
          command: "node -v",
        },
      ],
    });
    const code = await runner.code;
    expect(code).toBe(0);
  });

  test("exits with 1 if anyone fails", async () => {
    const runner = run({
      name: "rally",
      rally: [
        {
          name: "node version",
          command: "node -v",
        },
        {
          name: "exit10",
          command: "node tests/fixtures/exit-ten",
        },
      ],
    });
    const code = await runner.code;
    expect(code).toBe(1);
  });

  test("when arbitrarily killed returns 1 for exit code", async () => {
    const runner = run({
      name: "rally",
      rally: [
        {
          name: "node version",
          command: "node -v",
        },
        {
          name: "forever",
          command: "node tests/fixtures/forever",
        },
        {
          name: "node version",
          command: "node -v",
        },
      ],
    });
    runner.kill();
    const code = await runner.code;

    expect(code).toBe(1);
  });
});
