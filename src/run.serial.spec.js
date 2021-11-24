import { run } from "./run";

describe("serial composition scripts", () => {
  test("sequentially run all series independent of exit code", async () => {
    const runner = run({
      name: "serial",
      serial: [
        {
          name: "node version",
          command: "node -v",
        },
        {
          name: "throw",
          command: "node tests/fixtures/throw",
        },
        {
          name: "exit10",
          command: "node tests/fixtures/exit-ten",
        },
      ],
    });
    const code = await runner.code;
    expect(code).toBe(10);
  });

  test("when arbitrarily killed returns 1 for exit code", async () => {
    const runner = run({
      name: "serial",
      serial: [
        {
          name: "exit10",
          command: "node tests/fixtures/exit-ten",
        },
        {
          name: "forever",
          command: "node tests/fixtures/forever",
        },
      ],
    });
    runner.kill();
    const code = await runner.code;

    expect(code).toBe(1);
  });
});
