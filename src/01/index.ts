import { readLines } from "util/readLines";
import { mod } from "util/modulo";

export function parseInstr(instr: string): ["L" | "R", number] {
  const dir = instr[0] as "L" | "R";
  const rotations = parseInt(instr.slice(1));
  return [dir, rotations];
}

export function applyInstr(value: number, instr: string) {
  const [dir, rotations] = parseInstr(instr);
  return mod(value + rotations * (dir === "L" ? 1 : -1), 100);
}

// Part 1
export function part1(instructions: string[]) {
  let numZeroes = 0;
  let dialValue = 50;
  instructions.forEach((instr) => {
    dialValue = applyInstr(dialValue, instr);
    if (dialValue === 0) numZeroes++;
  });
  return numZeroes;
}

export function simplifyInstr(instr: string): string[] {
  const [dir, rotations] = parseInstr(instr);
  return new Array(rotations).fill(`${dir}1`);
}

// Part 2
export function part2(lines: string[]) {
  const instructions = lines.flatMap(simplifyInstr);
  return part1(instructions);
}

export function run() {
  const lines = readLines(__dirname + "/input.txt");
  console.log("Part 1:", part1(lines));
  console.log("Part 2:", part2(lines));
}
