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
export function part2(lines: string[]) {
  return 0;
}

export function run() {
  const lines = readLines(__dirname + "/input.txt");
  console.log("Part 1:", part1(lines));
  console.log("Part 2:", part2(lines));
}
