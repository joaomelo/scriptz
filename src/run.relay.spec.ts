import { run } from "./run";
import { Composition } from "./script";

describe("relay composition scripts", () => {
  test("sequentially run everything while scripts exit code is 0", async () => {
    const script: Composition = {
      name: "script",
      mode: "RELAY",
      scripts: [
        {
          name: "node version",
          instruction: "node -v",
        },
        {
          name: "exit10",
          instruction: "node tests/fixtures/exit-ten",
        },
        {
          name: "node version",
          instruction: "node -v",
        },
      ],
    };

    const runner = run(script);
    const code = await runner.code;
    expect(code).toBe(10);
  });

  test("when arbitrarily killed returns 1 for exit code", async () => {
    const script: Composition = {
      name: "script",
      mode: "RELAY",
      scripts: [
        {
          name: "node version",
          instruction: "node -v",
        },
        {
          name: "forever",
          instruction: "node tests/fixtures/forever",
        },
        {
          name: "node version",
          instruction: "node -v",
        },
      ],
    };

    const runner = run(script);
    runner.kill();
    const code = await runner.code;

    expect(code).toBe(1);
  });
});
