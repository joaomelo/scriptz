import { resolve } from "path";
import { pathToFileURL } from "url";

export async function extractUserScripts() {
  const configFilePath = resolveFilePath();
  const exportedScripts = await import(configFilePath);
  const scripts = Object.values(exportedScripts);
  return scripts;
}

function resolveFilePath() {
  const fileName = "sqript.config.js";
  const fileAbsolutePath = resolve(process.cwd(), fileName);
  const fileUrl = pathToFileURL(fileAbsolutePath);
  return fileUrl.pathname;
}
