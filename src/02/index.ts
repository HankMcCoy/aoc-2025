import { readLines } from "util/readLines";
import { createRange } from "util/range";
import { repeatString } from "util/str";

type Range = [number, number];
export function parseRanges(line: string): Array<Range> {
  return line
    .split(",")
    .map(
      (strRange) => strRange.split("-").map((x) => parseInt(x, 10)) as Range
    );
}

export function getInvalidIds(
  range: Range,
  isInvalidId: (x: number) => boolean
): number[] {
  const ids = createRange(range[0], range[1]);
  return ids.filter(isInvalidId);
}

// Part 1
export function isInvalidIdSimple(x: number): boolean {
  const str = x.toString();
  return str.slice(0, str.length / 2) === str.slice(str.length / 2, str.length);
}
export function part1(lines: string[]) {
  const ranges = parseRanges(lines[0]);
  const invalidIds = ranges.flatMap((r) => getInvalidIds(r, isInvalidIdSimple));
  return invalidIds.reduce((a, b) => a + b, 0);
}

// Part 2
export function isInvalidIdComplex(x: number): boolean {
  const strId = x.toString();
  const idLen = strId.length;
  const hasRepetitionOfLength = (patternLength: number): boolean => {
    const numReps = idLen / patternLength;
    return repeatString(strId.slice(0, patternLength), numReps) === strId;
  };
  const potentialRepeatLengths = createRange(1, Math.floor(idLen / 2)).filter(
    (l) => idLen % l === 0
  );
  return potentialRepeatLengths.some(hasRepetitionOfLength);
}

export function part2(lines: string[]) {
  const ranges = parseRanges(lines[0]);
  const invalidIds = ranges.flatMap((r) =>
    getInvalidIds(r, isInvalidIdComplex)
  );
  return invalidIds.reduce((a, b) => a + b, 0);
}

export function run() {
  const lines = readLines(__dirname + "/input.txt");
  console.log("Part 1:", part1(lines));
  console.log("Part 2:", part2(lines));
}
