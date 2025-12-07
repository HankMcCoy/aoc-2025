import { describe, it, expect } from "vitest";
import { isInvalidIdComplex, parseRanges, part1, part2 } from "./index";

const testLines =
  `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`.split(
    "\n"
  );

describe("Day 02", () => {
  describe("parseRanges", () => {
    it("works for a single range", () => {
      expect(parseRanges("1-10")).toEqual([[1, 10]]);
    });
    it("works for multiple rangesj", () => {
      expect(parseRanges("1-10,4-80")).toEqual([
        [1, 10],
        [4, 80],
      ]);
    });
  });

  describe("isInvalidIdComplex", () => {
    it("works for a single digit repeated", () => {
      expect(isInvalidIdComplex(22222)).toBe(true);
    });
    it("works for a pattern repeated 3 times", () => {
      expect(isInvalidIdComplex(343434)).toBe(true);
    });
  });

  describe("Part 1", () => {
    it("works", () => {
      expect(part1(testLines)).toBe(1227775554);
    });
  });

  describe("Part 2", () => {
    it("works", () => {
      expect(part2(testLines)).toBe(4174379265);
    });
  });
});
