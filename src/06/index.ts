import { createRange } from "util/range";
import { readLines } from "../../util/readLines";

type Operator = "+" | "*";
type Problem = { operands: number[]; operator: Operator };

const parseItems = (line: string) => line.split(" ").filter((x) => x);

export function calc({ operands, operator }: Problem): number {
  return operator === "+"
    ? operands.reduce((a, b) => a + b)
    : operands.reduce((a, b) => a * b);
}

// Part 1
export function parseProblemsV1(lines: string[]): Problem[] {
  const operandRows = lines
    .slice(0, -1)
    .map((l) => parseItems(l).map((s) => parseInt(s, 10)));

  const operatorRow = parseItems(lines[lines.length - 1]).map(
    (operator) => operator as Operator
  );
  const numProblems = operandRows[0].length;
  return new Array(numProblems).fill(null).map((_, i) => ({
    operands: operandRows.map((r) => r[i]),
    operator: operatorRow[i],
  }));
}
export function part1(lines: string[]) {
  const problems = parseProblemsV1(lines);
  return problems.map(calc).reduce((a, b) => a + b);
}

export function rotateLeft<T>(matrix: T[][]): T[][] {
  const width = matrix[0].length; // 3
  const height = matrix.length; // 2

  return createRange(0, width - 1).map((row) =>
    createRange(0, height - 1).map((col) => matrix[col][width - row - 1])
  );
}

export function splitBySentinel<T>(arr: T[], sentinel: T): T[][] {
  return arr
    .reduce(
      (acc, x): T[][] => {
        if (x === sentinel) {
          return [...acc, []];
        } else {
          return [...acc.slice(0, -1), [...acc[acc.length - 1], x]];
        }
      },
      [[]]
    )
    .filter((x) => x.length > 0);
}

// Part 2
export function parseProblemsV2(lines: string[]): Problem[] {
  const operandLines = lines.slice(0, -1);
  const operandMatrix = operandLines.map((l) => l.split(""));
  const rotatedMatrix = rotateLeft(operandMatrix);
  const operands = splitBySentinel(
    rotatedMatrix.map((l) => l.join("").trim()),
    ""
  )
    .map((opStrList) => opStrList.map((s) => parseInt(s, 10)))
    .reverse();

  const operatorRow = parseItems(lines[lines.length - 1]).map(
    (operator) => operator as Operator
  );
  const numProblems = operatorRow.length;

  return new Array(numProblems).fill(null).map((_, i) => ({
    operands: operands[i],
    operator: operatorRow[i],
  }));
}

export function part2(lines: string[]) {
  const problems = parseProblemsV2(lines);
  return problems.map(calc).reduce((a, b) => a + b);
}

export function run() {
  const lines = readLines(__dirname + "/input.txt");
  console.log("Part 1:", part1(lines));
  console.log("Part 2:", part2(lines));
}
