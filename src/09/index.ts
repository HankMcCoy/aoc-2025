import { createRange } from "util/range";
import { readLines } from "../../util/readLines";

type Coord = { x: number; y: number };
type CoordStr = `${number},${number}`;

function parseCoord(coordStr: string): Coord {
  const [x, y] = coordStr.split(",").map((s) => parseInt(s, 10));
  return { x, y };
}

function parseLines(lines: string[]) {
  return lines.map(parseCoord);
}

const calcArea = (c1: Coord, c2: Coord) =>
  (Math.abs(c1.x - c2.x) + 1) * (Math.abs(c1.y - c2.y) + 1);

function calcAreas(coords: Coord[]): { c1: Coord; c2: Coord; area: number }[] {
  return createRange(0, coords.length - 2).flatMap((i) =>
    createRange(i + 1, coords.length - 1).map((j) => {
      const [c1, c2] = [coords[i], coords[j]];
      return { c1, c2, area: calcArea(c1, c2) };
    })
  );
}

// Part 1
export function part1(lines: string[]) {
  const coords = parseLines(lines);
  const areas = calcAreas(coords);

  const { area } = areas.sort((a, b) => b.area - a.area)[0];
  return area;
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
