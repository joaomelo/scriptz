import chalk, { Color, Modifiers } from "chalk";

export type Style = typeof Color | typeof Modifiers;
export type Styles = Style[];

export function applyStyles(str: string, styles: Styles = []) {
  return styles.reduce((acc, cur) => {
    const next = chalk[cur](acc);
    return next;
  }, str);
}
