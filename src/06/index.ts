import { readLines } from "../../util/readLines";

type Operator = "+" | "*";
type Problem = { operands: number[]; operator: Operator };

const parseItems = (line: string) => line.split(" ").filter((x) => x);

export function parseProblems(lines: string[]): Problem[] {
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

export function calc({ operands, operator }: Problem): number {
  return operator === "+"
    ? operands.reduce((a, b) => a + b)
    : operands.reduce((a, b) => a * b);
}

// Part 1
export function part1(lines: string[]) {
  const problems = parseProblems(lines);
  return problems.map(calc).reduce((a, b) => a + b);
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
