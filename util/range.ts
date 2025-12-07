export function createRange(start: number, end: number): Array<number> {
  return new Array(end - start + 1).fill(null).map((_, i) => start + i);
}
