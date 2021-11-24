import { expectInfoCalledWith } from "../tests/expect";
import { run } from "./run";

describe("script tagging", () => {
  test("tags are printed orderly", async () => {
    const runner = run({
      name: "serial",
      serial: [
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
    await runner.code;

    expect(global.console.info).toHaveBeenCalledTimes(5);

    expectInfoCalledWith("starting", 1);
    expectInfoCalledWith("v", 2);
    expectInfoCalledWith("exited", 3);
    expectInfoCalledWith("starting", 4);
    expectInfoCalledWith("exited", 5);
  });

  test("hierarchy is properly presented", async () => {
    const grand = "grand";
    const parent1 = "parent1";
    const parent2 = "parent2";
    const child21 = "child21";
    const child22 = "child22";

    const runner = run({
      name: grand,
      relay: [
        {
          name: parent1,
          command: `echo ${parent1}`,
        },
        {
          name: parent2,
          relay: [
            {
              name: child21,
              command: `echo ${child21}`,
            },
            {
              name: child22,
              command: `echo ${child22}`,
            },
          ],
        },
      ],
    });
    await runner.code;

    expectInfoCalledWith(`[${grand}][${parent1}]`, 1);
    expectInfoCalledWith(`[${grand}][${parent2}][${child21}]`, 4);
  });
});
