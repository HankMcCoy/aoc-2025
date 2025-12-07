export function repeatString(s: string, reps: number) {
  return new Array(reps).fill(s).join("");
}
