import { Composition } from "./script";
import { run } from "./run";

describe("script tagging", () => {
  const expectCall = (n: number, s: string) =>
    expect(global.console.info).nthCalledWith(n, expect.stringContaining(s));

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

  test.only("hierarchy is properly presented", async () => {
    const grand = "grand";
    const parent1 = "parent1";
    const parent2 = "parent2";
    const child21 = "child21";
    const child22 = "child22";
    const script: Composition = {
      name: grand,
      mode: "RELAY",
      scripts: [
        {
          name: parent1,
          instruction: `echo ${parent1}`,
        },
        {
          name: parent2,
          mode: "RELAY",
          scripts: [
            {
              name: child21,
              instruction: `echo ${child21}`,
            },
            {
              name: child22,
              instruction: `echo ${child22}`,
            },
          ],
        },
      ],
    };

    const runner = run(script);
    await runner.code;

    expectCall(1, `[${grand}][${parent1}]`);
    expectCall(4, `[${grand}][${parent2}][${child21}]`);
  });
});
