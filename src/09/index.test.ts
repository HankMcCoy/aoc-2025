import { describe, it, expect } from "vitest";
import { part1, part2 } from "./index";

const testLines = `7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3`.split("\n");

describe("Day 09", () => {
  describe("Part 1", () => {
    it("works", () => {
      expect(part1(testLines)).toBe(50);
    });
  });
  describe("Part 2", () => {
    it("works", () => {
      expect(part2(testLines)).toBe(0);
    });
  });
});
