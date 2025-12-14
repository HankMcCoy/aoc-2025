import { readLines } from "../../util/readLines";

type Coord = { x: number; y: number; z: number };

function calcDistance(c1: Coord, c2: Coord): number {
  return Math.sqrt(
    (c2.x - c1.x) ** 2 + (c2.y - c1.y) ** 2 + (c2.z - c1.z) ** 2
  );
}

function toCoordStr(c: Coord) {
  return `${c.x},${c.y},${c.z}` as const;
}

function parseCoord(coordStr: string): Coord {
  const [x, y, z] = coordStr.split(",").map((s) => parseInt(s, 10));
  return { x, y, z };
}

export function parseCoords(lines: CoordStr[]): Coord[] {
  return lines.map(parseCoord);
}
function splitCoordPairStr(coordPairStr: CoordPairStr): [CoordStr, CoordStr] {
  return coordPairStr.split("->") as [CoordStr, CoordStr];
}
function parseCoordPairStr(coordPairStr: CoordPairStr): [Coord, Coord] {
  return splitCoordPairStr(coordPairStr).map(parseCoord) as [Coord, Coord];
}
export type CoordStr = `${number},${number},${number}`;
type CoordPairStr = `${CoordStr}->${CoordStr}`;

type CircuitId = number & { __brand: "CircuitId" };
type PairDistance = { coordPairStr: CoordPairStr; distance: number };

// Merge c2 into c1
export function mergeCircuits(
  junctionBoxToCircuit: Map<CoordStr, CircuitId>,
  c1: CircuitId,
  c2: CircuitId
) {
  [...junctionBoxToCircuit.entries()]
    .filter(([_coord, cid]) => cid === c2)
    .forEach(([coord]) => junctionBoxToCircuit.set(coord, c1));
}
// Part 1
export function part1(lines: string[], iterations = 1000) {
  const junctionBoxCoords = parseCoords(lines as CoordStr[]);

  const pairDistances: PairDistance[] = [];
  const junctionBoxToCircuit = new Map<CoordStr, CircuitId>();
  for (let i = 0; i < junctionBoxCoords.length; i++) {
    const c1 = junctionBoxCoords[i];
    junctionBoxToCircuit.set(toCoordStr(c1), i as CircuitId);
    for (let j = i + 1; j < junctionBoxCoords.length; j++) {
      const c2 = junctionBoxCoords[j];
      pairDistances.push({
        coordPairStr: `${toCoordStr(c1)}->${toCoordStr(c2)}`,
        distance: calcDistance(c1, c2),
      });
    }
  }
  // Sort pairs by distance
  pairDistances.sort((a, b) => a.distance - b.distance);

  for (let i = 0; i < iterations; i++) {
    const [cps1, cps2] = splitCoordPairStr(pairDistances[i].coordPairStr);
    const circuit1 = junctionBoxToCircuit.get(cps1) as CircuitId;
    const circuit2 = junctionBoxToCircuit.get(cps2) as CircuitId;
    mergeCircuits(junctionBoxToCircuit, circuit1, circuit2);
  }

  const circuitSizes = new Map<CircuitId, number>();
  const coordCircuitPairs = [...junctionBoxToCircuit.entries()];
  for (let circuitId of junctionBoxToCircuit.values()) {
    circuitSizes.set(
      circuitId,
      // Get the number of junction boxes associated with a circuit
      coordCircuitPairs.filter(([_, cid]) => {
        return cid === circuitId;
      }).length
    );
  }

  return [...circuitSizes.entries()]
    .map((x) => x[1])
    .sort((sizeA, sizeB) => sizeB - sizeA)
    .slice(0, 3)
    .reduce((a, b) => a * b);
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
