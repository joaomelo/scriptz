import { run } from "./run";
import { Composition } from "./script";

describe("race composition scripts", () => {
  test("exits with first completed code", async () => {
    const script: Composition = {
      name: "script",
      mode: "RACE",
      scripts: [
        {
          name: "forever",
          instruction: "node tests/fixtures/forever",
        },
        {
          name: "exit10",
          instruction: "node tests/fixtures/exit-ten",
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
      mode: "RACE",
      scripts: [
        {
          name: "forever",
          instruction: "node tests/fixtures/forever",
        },
        {
          name: "forever",
          instruction: "node tests/fixtures/forever",
        },
      ],
    };

    const runner = run(script);
    runner.kill();
    const code = await runner.code;

    expect(code).toBe(1);
  });
});
