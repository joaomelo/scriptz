import { Input } from "https://deno.land/x/cliffy@v0.19.6/prompt/mod.ts";

export async function obtainNameFromUser(
  availableNames: string[],
): Promise<string> {
  const cliName = Deno.args[0];
  if (typeof cliName === "string") {
    return cliName;
  }

  const promptName: string = await Input.prompt({
    message: "Type the name of the script you wish to run",
    list: true,
    info: true,
    suggestions: availableNames,
  });

  return promptName;
}
