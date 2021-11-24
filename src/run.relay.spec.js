import { run } from "./run";

describe("relay composition scripts", () => {
  test("sequentially run everything while scripts exit code is 0", async () => {
    const runner = run({
      name: "relay",
      relay: [
        {
          name: "node version",
          command: "node -v",
        },
        {
          name: "exit10",
          command: "node tests/fixtures/exit-ten",
        },
        {
          name: "node version",
          command: "node -v",
        },
      ],
    });
    const code = await runner.code;
    expect(code).toBe(10);
  });

  test("when arbitrarily killed returns 1 for exit code", async () => {
    const runner = run({
      name: "relay",
      relay: [
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
