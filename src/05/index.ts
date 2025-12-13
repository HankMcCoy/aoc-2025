import { readLines } from "../../util/readLines";

type Range = { start: number; end: number };
type Db = {
  freshRanges: Range[];
  ingredients: number[];
};

export function parseDb(lines: string[]): Db {
  let blankLineIdx = lines.indexOf("");

  const freshRanges = lines.slice(0, blankLineIdx).map((l) => {
    const [start, end] = l.split("-").map((s) => parseInt(s, 10));
    return { start, end };
  });

  const ingredients = lines.slice(blankLineIdx + 1).map((s) => parseInt(s, 10));

  return {
    freshRanges,
    ingredients,
  };
}

export function isInRange(x: number, ranges: Range[]) {
  return ranges.some((r) => x >= r.start && x <= r.end);
}
// Part 1
export function part1(lines: string[]) {
  const { freshRanges, ingredients } = parseDb(lines);
  return ingredients.filter((ingredient) => isInRange(ingredient, freshRanges))
    .length;
}

// Part 2
export const isStrictlyAbove = (r1: Range, r2: Range) => r1.start > r2.end;
export const isStrictlyBelow = (r1: Range, r2: Range) => r1.end < r2.start;

export const sortByStart = (ranges: Range[]): Range[] =>
  ranges.sort((r1, r2) => r1.start - r2.start);

export function mergeRanges(r1: Range, r2: Range): Range {
  if (isStrictlyAbove(r1, r2) || isStrictlyBelow(r1, r2)) {
    throw new Error("Cannot merge non-overlapping ranges");
  }

  return { start: Math.min(r1.start, r2.start), end: Math.max(r1.end, r2.end) };
}

export function mergeRangeIntoRanges(
  sortedRanges: Range[],
  newRange: Range
): Range[] {
  // Find the first range that isn't strictly below the target range
  const candidateIdx = sortedRanges.findIndex(
    (r) => !isStrictlyBelow(r, newRange)
  );
  if (candidateIdx >= 0) {
    const candidateRange = sortedRanges[candidateIdx];
    const earlierRanges = sortedRanges.slice(0, candidateIdx);
    const laterRanges = sortedRanges.slice(candidateIdx + 1);

    // If that range is strictly above the target range, insert the target range here. We're done, there's no overlap.
    if (isStrictlyAbove(candidateRange, newRange)) {
      const result = [
        ...earlierRanges,
        newRange,
        candidateRange,
        ...laterRanges,
      ];
      return result;
    } else {
      // If not, these ranges overlap. Combine them. Merge this new range with all the following ranges.
      const result = [
        ...earlierRanges,
        ...mergeRangeIntoRanges(
          laterRanges,
          mergeRanges(newRange, candidateRange)
        ),
      ];
      return result;
    }
  } else {
    // If there isn't one, add the new range to the start. It is below all existing ranges with no overlap.
    return [...sortedRanges, newRange];
  }
}

export function part2(lines: string[]) {
  const { freshRanges } = parseDb(lines);

  const mergedRanges = sortByStart(freshRanges).reduce(
    mergeRangeIntoRanges,
    []
  );
  return mergedRanges
    .map((r) => r.end - r.start + 1)
    .reduce((a, b) => a + b, 0);
}

export function run() {
  const lines = readLines(__dirname + "/input.txt");
  console.log("Part 1:", part1(lines));
  console.log("Part 2:", part2(lines));
}
