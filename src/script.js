import { resolve } from "path";
import { pathToFileURL } from "url";

export async function extractUserScripts() {
  const configFilePath = resolveFilePath();
  console.log("test1");
  const exportedScripts = await import(configFilePath);
  console.log("test2");
  const scripts = Object.values(exportedScripts);
  return scripts;
}

function resolveFilePath() {
  const fileName = "sqript.js";
  const fileAbsolutePath = resolve(process.cwd(), fileName);
  const fileUrl = pathToFileURL(fileAbsolutePath);
  return fileUrl.pathname;
}
