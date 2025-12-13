import { parse } from "path";
import { readLines } from "../../util/readLines";

type CoordStr = `${number},${number}`;
type Diagram = {
  width: number;
  height: number;
  rollsCoords: Set<CoordStr>;
};
export function parseDiagram(lines: string[]): Diagram {
  const width = lines[0].length;
  const height = lines.length;
  const rollsCoords = new Set<CoordStr>();

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (lines[y][x] === "@") {
        rollsCoords.add(`${x},${y}`);
      }
    }
  }

  return { width, height, rollsCoords };
}

type Coord = { x: number; y: number };
export function parseCoordStr(cs: CoordStr): Coord {
  const [x, y] = cs.split(",").map((s) => parseInt(s, 10));
  return { x, y };
}

export function addCoordStrs(cs1: CoordStr, cs2: CoordStr): CoordStr {
  const { x, y } = addCoords(parseCoordStr(cs1), parseCoordStr(cs2));
  return `${x},${y}`;
}

export function areCoordsEqual(c1: Coord, c2: Coord): boolean {
  return c1.x === c2.x && c1.y === c2.y;
}

export function addCoords(c1: Coord, c2: Coord) {
  return { x: c1.x + c2.x, y: c1.y + c2.y };
}

export function getNeighborCoords(
  coord: Coord,
  { width, height }: { width: number; height: number }
): Coord[] {
  return [-1, 0, 1]
    .flatMap((deltaX) =>
      [-1, 0, 1].map((deltaY) => addCoords(coord, { x: deltaX, y: deltaY }))
    )
    .filter((neighbor) => !areCoordsEqual(coord, neighbor))
    .filter((neighbor) => neighbor.x >= 0 && neighbor.y >= 0)
    .filter((neighbor) => neighbor.x < width && neighbor.y < width);
}

export function countNeighboringRolls(coord: Coord, diagram: Diagram) {
  return getNeighborCoords(coord, diagram).filter((c) =>
    diagram.rollsCoords.has(`${c.x},${c.y}`)
  ).length;
}

export function isAccessible(coord: Coord, diagram: Diagram) {
  return countNeighboringRolls(coord, diagram) < 4;
}

// Part 1
export function part1(lines: string[]) {
  const diagram = parseDiagram(lines);
  return [...diagram.rollsCoords.values()].reduce(
    (acc, cs) => (isAccessible(parseCoordStr(cs), diagram) ? acc + 1 : acc),
    0
  );
}

// Part 2
function removeAccessible(diagram: Diagram): Diagram {
  return {
    ...diagram,
    rollsCoords: new Set(
      [...diagram.rollsCoords.values()].filter(
        (cs) => !isAccessible(parseCoordStr(cs), diagram)
      )
    ),
  };
}
export function part2(lines: string[]) {
  let diagram = parseDiagram(lines);
  let startingRolls = diagram.rollsCoords.size;

  while (true) {
    let nextDiagram = removeAccessible(diagram);
    if (nextDiagram.rollsCoords.size === diagram.rollsCoords.size) break;
    diagram = nextDiagram;
  }

  return startingRolls - diagram.rollsCoords.size;
}

export function run() {
  const lines = readLines(__dirname + "/input.txt");
  console.log("Part 1:", part1(lines));
  console.log("Part 2:", part2(lines));
}
