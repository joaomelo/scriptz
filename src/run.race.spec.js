import { run } from "./run";

describe("race composition scripts", () => {
  test("exits with first completed code", async () => {
    const runner = run({
      name: "race",
      race: [
        {
          name: "forever",
          command: "node tests/fixtures/forever",
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
      name: "race",
      race: [
        {
          name: "forever",
          command: "node tests/fixtures/forever",
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
