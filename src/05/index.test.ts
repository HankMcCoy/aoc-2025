import { describe, it, expect } from "vitest";
import { parseDb, part1, part2 } from "./index";

const testLines = `3-5
10-14
16-20
12-18

1
5
8
11
17
32`.split("\n");

describe("Day 05", () => {
  describe("parseDb", () => {
    it("parses freshRanges", () => {
      const db = parseDb(testLines);

      expect(db.freshRanges.length).toBe(4);
      expect(db.freshRanges[0]).toEqual({ start: 3, end: 5 });
      expect(db.freshRanges[3]).toEqual({ start: 12, end: 18 });
    });

    it("parses ingredients", () => {
      const db = parseDb(testLines);

      expect(db.ingredients.length).toBe(6);
      expect(db.ingredients[0]).toBe(1);
      expect(db.ingredients[5]).toBe(32);
    });
  });
  describe("Part 1", () => {
    it("works", () => {
      expect(part1(testLines)).toBe(3);
    });
  });
  describe("Part 2", () => {
    it("works", () => {
      expect(part2(testLines)).toBe(0);
    });
  });
});
