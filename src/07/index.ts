import { createRange } from "util/range";
import { readLines } from "../../util/readLines";

export function lineToSplitterIdxs(line: string) {
  return new Set([
    ...line
      .split("")
      .map((c, i) => [c, i] as const)
      .filter(([c, i]) => c === "^")
      .map(([_, i]) => i),
  ]);
}

/*
export function print(
  tachyonIdxs: Set<number>,
  splitterIdxs: Set<number>,
  width: number
) {
  const idxs = createRange(0, width - 1);
  console.log(idxs.map((i) => (tachyonIdxs.has(i) ? "|" : " ")).join(""));
  console.log(
    idxs
      .map((i) => (splitterIdxs.has(i) ? "^" : tachyonIdxs.has(i) ? "|" : " "))
      .join("")
  );
}
*/

// Part 1
export function part1(lines: string[]) {
  let tachyonIdxs = new Set<number>();
  tachyonIdxs.add(lines[0].indexOf("S"));
  const width = lines[0].length;
  let splitterHits = 0;

  lines
    .slice(1)
    .map(lineToSplitterIdxs)
    .forEach((splitterIdxs) => {
      const hitSplitterIdxs = [...splitterIdxs.values()].filter((splitterIdx) =>
        tachyonIdxs.has(splitterIdx)
      );
      splitterHits += hitSplitterIdxs.length;
      const newTachyons = new Set([
        ...hitSplitterIdxs.flatMap((x) =>
          [x - 1, x + 1].filter((x) => x >= 0 && x < width)
        ),
      ]);

      tachyonIdxs = tachyonIdxs
        // Don't allow tachyons to pass through splitters
        .difference(splitterIdxs)
        // Do include the new tachyons on either side of the splitters
        .union(newTachyons);
    });

  return splitterHits;
}

// Part 2

export function part2(lines: string[]) {
  let tachyonIdx = lines[0].indexOf("S");
  const width = lines[0].length;
  const manifolds = lines.slice(1).map(lineToSplitterIdxs);
  const cache = new Map<string, number>();

  function countUniverses(tachyon: number, curManifoldIdx: number): number {
    const cacheKey = `${tachyon},${curManifoldIdx}`;
    if (cache.has(cacheKey)) return cache.get(cacheKey) as number;

    let result;
    if (manifolds[curManifoldIdx].has(tachyon)) {
      result = [tachyon - 1, tachyon + 1]
        .filter((t) => t >= 0 && t < width)
        .map((t) => countUniverses(t, curManifoldIdx + 1))
        .reduce((a, b) => a + b);
    } else if (curManifoldIdx < width - 1) {
      // This manifold has no effect on the path of the tachyon
      result = countUniverses(tachyon, curManifoldIdx + 1);
    } else {
      // We have reached the end of this particular universe
      result = 1;
    }
    cache.set(cacheKey, result);
    return result;
  }

  return countUniverses(tachyonIdx, 0);
}

export function run() {
  const lines = readLines(__dirname + "/input.txt");
  console.log("Part 1:", part1(lines));
  console.log("Part 2:", part2(lines));
}
