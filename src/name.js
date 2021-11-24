import { prompt } from "enquirer";

export async function obtainNameFromUser(availableNames) {
  const cliName = process.argv[2];
  if (typeof cliName === "string") {
    return cliName;
  }

  const exitName = "exit";
  const response = await prompt({
    type: "select",
    name: "name",
    message: "Choose a script to run",
    choices: [...availableNames, exitName],
  });

  const { name } = response;
  if (!(typeof name === "string") || name === exitName) {
    return false;
  }

  return name;
}
