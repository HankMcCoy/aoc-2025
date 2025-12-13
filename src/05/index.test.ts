import { describe, it, expect } from "vitest";
import {
  parseDb,
  isStrictlyAbove,
  isStrictlyBelow,
  mergeRangeIntoRanges,
  mergeRanges,
  part1,
  part2,
} from "./index";

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

  describe("mergeRanges", () => {
    it("throws on non-overlapping ranges", () => {
      expect(() =>
        mergeRanges({ start: 0, end: 1 }, { start: 4, end: 5 })
      ).toThrow();
    });

    it("Merges a simple overlap (small to large)", () => {
      const newRange = mergeRanges(
        { start: 0, end: 12 },
        { start: 7, end: 15 }
      );
      expect(newRange.start).toBe(0);
      expect(newRange.end).toBe(15);
    });
    it("Merges a simple overlap (large to small)", () => {
      const newRange = mergeRanges(
        { start: 7, end: 15 },
        { start: 0, end: 12 }
      );
      expect(newRange.start).toBe(0);
      expect(newRange.end).toBe(15);
    });
    it("Handles a fully contained range", () => {
      const newRange = mergeRanges({ start: 0, end: 12 }, { start: 7, end: 8 });
      expect(newRange.start).toBe(0);
      expect(newRange.end).toBe(12);
    });
  });

  describe("merge", () => {
    it("Merges a range into an empty list", () => {
      const newRanges = mergeRangeIntoRanges([], { start: 0, end: 10 });

      expect(newRanges.length).toBe(1);
      expect(newRanges[0].start).toBe(0);
      expect(newRanges[0].end).toBe(10);
    });

    it("Adds a non-overlapping range to smaller ranges", () => {
      const newRanges = mergeRangeIntoRanges(
        [
          { start: 0, end: 2 },
          { start: 5, end: 8 },
        ],
        { start: 10, end: 12 }
      );

      expect(newRanges.length).toBe(3);
      expect(newRanges[0].start).toBe(0);
      expect(newRanges[1].start).toBe(5);
      expect(newRanges[2].start).toBe(10);
    });

    it("Adds a non-overlapping range to larger ranges", () => {
      const newRanges = mergeRangeIntoRanges(
        [
          { start: 0, end: 2 },
          { start: 5, end: 8 },
        ],
        { start: -12, end: -10 }
      );

      expect(newRanges.length).toBe(3);
      expect(newRanges[0].start).toBe(-12);
      expect(newRanges[1].start).toBe(0);
      expect(newRanges[2].start).toBe(5);
    });

    it("Adds a range that overlaps with one other range", () => {
      const newRanges = mergeRangeIntoRanges(
        [
          { start: 0, end: 2 },
          { start: 5, end: 8 },
        ],
        { start: 1, end: 3 }
      );

      expect(newRanges.length).toBe(2);
      expect(newRanges[0].start).toBe(0);
      expect(newRanges[0].end).toBe(3);
      expect(newRanges[1].start).toBe(5);
      expect(newRanges[1].end).toBe(8);
    });
  });

  describe("Part 1", () => {
    it("works", () => {
      expect(part1(testLines)).toBe(3);
    });
  });
  /*
  describe("Part 2", () => {
    it("works", () => {
      expect(part2(testLines)).toBe(14);
    });
  });
  */
});
