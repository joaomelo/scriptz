import enquirer from "enquirer";
import { evaluateArgument } from "./arguments.js";

export async function obtainNameFromUser(availableNames) {
  const argName = evaluateArgument("name");
  if (typeof argName === "string") {
    return argName;
  }

  const exitName = "exit";
  const { prompt } = enquirer;
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
