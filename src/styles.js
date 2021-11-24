import chalk from "chalk";

export function applyStyles(targetStr, styles = []) {
  return styles.reduce(
    (formattedStr, style) => chalk[style](formattedStr),
    targetStr
  );
}
