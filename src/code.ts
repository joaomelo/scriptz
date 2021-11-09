type Code = number | number[] | undefined | null;

export function solveCode(code: Code) {
  if (code === null || code === undefined) return 1;
  if (typeof code === "number") return code;

  return code.every((c) => c === 0) ? 0 : 1;
}
