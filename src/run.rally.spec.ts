import { run } from "./run";
import { Composition } from "./script";

describe("rally composition scripts", () => {
  test("exits with 0 if everyone succeeds", async () => {
    const script: Composition = {
      name: "script",
      mode: "RALLY",
      scripts: [
        {
          name: "node version",
          instruction: "node -v",
        },
        {
          name: "node version",
          instruction: "node -v",
        },
        {
          name: "node version",
          instruction: "node -v",
        },
      ],
    };

    const runner = run(script);
    const code = await runner.code;
    expect(code).toBe(0);
  });

  test("exits with 1 if anyone fails", async () => {
    const script: Composition = {
      name: "script",
      mode: "RALLY",
      scripts: [
        {
          name: "node version",
          instruction: "node -v",
        },
        {
          name: "exit10",
          instruction: "node tests/fixtures/exit-ten",
        },
      ],
    };

    const runner = run(script);
    const code = await runner.code;
    expect(code).toBe(1);
  });

  test("when arbitrarily killed returns 1 for exit code", async () => {
    const script: Composition = {
      name: "script",
      mode: "RALLY",
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
