export function expectInfoCalledWith(str, nthTime) {
  return nthTime
    ? expect(global.console.info).toHaveBeenNthCalledWith(
        nthTime,
        expect.stringContaining(str)
      )
    : expect(global.console.info).toHaveBeenCalledWith(
        expect.stringContaining(str)
      );
}
