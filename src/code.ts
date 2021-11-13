type Code = number | undefined | null;

export function solveCode(code: Code) {
  if (code === null || code === undefined) return 1;
  return code;
}
