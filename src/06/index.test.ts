import { describe, it, expect } from "vitest";
import { calc, parseProblems, part1, part2 } from "./index";

const testLines = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `.split("\n");

describe("Day 06", () => {
  describe("parseProblems", () => {
    it("works", () => {
      const problems = parseProblems(testLines);

      expect(problems.length).toBe(4);
      expect(problems[0]).toEqual({ operands: [123, 45, 6], operator: "*" });
    });
  });

  describe("calc", () => {
    it("works", () => {
      const problems = parseProblems(testLines);
      expect(calc(problems[0])).toBe(33210);
    });
  });

  describe("Part 1", () => {
    it("works", () => {
      expect(part1(testLines)).toBe(4277556);
    });
  });

  describe("Part 2", () => {
    it("works", () => {
      expect(part2(testLines)).toBe(0);
    });
  });
});
