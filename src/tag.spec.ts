import { Composition } from "./script";
import { run } from "./run";

describe("script tagging", () => {
  const expectCall = (n: number, s: string) =>
    expect(global.console.info).nthCalledWith(n, expect.stringMatching(s));

  test("tags are printed orderly", async () => {
    const serial: Composition = {
      name: "serial",
      mode: "SERIAL",
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

    const runner = run(serial);
    await runner.code;

    expect(global.console.info).toBeCalledTimes(5);

    expectCall(1, "starting");
    expectCall(2, "v");
    expectCall(3, "exited");
    expectCall(4, "starting");
    expectCall(5, "exited");
  });

  test("hierarchy is properly presented", async () => {
    const grandparent = "script";
    const child1 = "node";
    const child2 = "ten";
    const script: Composition = {
      name: grandparent,
      mode: "SERIAL",
      scripts: [
        {
          name: child1,
          instruction: "node -v",
        },
        {
          name: child2,
          instruction: "node tests/fixtures/exit-ten",
        },
      ],
    };

    const runner = run(script);
    await runner.code;

    expectCall(1, `[${grandparent}][${child1}]`);
    expectCall(4, `[${grandparent}][${child2}]`);
  });
});
