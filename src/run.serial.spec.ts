import { run } from "./run";
import { Composition } from "./script";

describe("serial composition scripts", () => {
  test("sequentially run all series independent of exit code", async () => {
    const serial: Composition = {
      name: "serial",
      mode: "SERIAL",
      scripts: [
        {
          name: "node version",
          instruction: "node -v",
        },
        {
          name: "throw",
          instruction: "node tests/fixtures/throw",
        },
        {
          name: "exit10",
          instruction: "node tests/fixtures/exit-ten",
        },
      ],
    };

    const runner = run(serial);
    const code = await runner.code;
    expect(code).toBe(10);
  });

  test("when arbitrarily killed returns 1 for exit code", async () => {
    const serial: Composition = {
      name: "serial",
      mode: "SERIAL",
      scripts: [
        {
          name: "exit10",
          instruction: "node tests/fixtures/exit-ten",
        },
        {
          name: "forever",
          instruction: "node tests/fixtures/forever",
        },
      ],
    };

    const runner = run(serial);
    runner.kill();
    const code = await runner.code;

    expect(code).toBe(1);
  });
});
