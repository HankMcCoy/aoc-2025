import { describe, it, expect } from "vitest";
import {
  calc,
  parseProblemsV1,
  parseProblemsV2,
  rotateLeft,
  part1,
  part2,
  splitBySentinel,
} from "./index";

const testLines = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `.split("\n");

describe("Day 06", () => {
  describe("calc", () => {
    it("works", () => {
      const problems = parseProblemsV1(testLines);
      expect(calc(problems[0])).toBe(33210);
    });
  });

  describe("parseProblemsV1", () => {
    it("works", () => {
      const problems = parseProblemsV1(testLines);

      expect(problems.length).toBe(4);
      expect(problems[0]).toEqual({ operands: [123, 45, 6], operator: "*" });
    });
  });

  describe("Part 1", () => {
    it("works", () => {
      expect(part1(testLines)).toBe(4277556);
    });
  });

  describe("rotateLeft", () => {
    it("works", () => {
      expect(
        rotateLeft([
          [1, 2, 3],
          [4, 5, 6],
        ])
      ).toEqual([
        [3, 6],
        [2, 5],
        [1, 4],
      ]);
    });
  });

  describe("splitBySentinel", () => {
    it("works", () => {
      const result = splitBySentinel(
        ["1", "23", "", "4", "", "56", "1200", "34"],
        ""
      );
      expect(result.length).toBe(3);
      expect(result[0]).toEqual(["1", "23"]);
      expect(result[1]).toEqual(["4"]);
      expect(result[2]).toEqual(["56", "1200", "34"]);
    });
  });

  describe("parseProblemsV2", () => {
    it("works", () => {
      const problems = parseProblemsV2(testLines);

      expect(problems.length).toBe(4);
      expect(problems[0]).toEqual({ operands: [356, 24, 1], operator: "*" });
    });
  });

  describe("Part 2", () => {
    it("works", () => {
      expect(part2(testLines)).toBe(3263827);
    });
  });
});
