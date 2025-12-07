import { describe, it, expect } from "vitest";
import { part1, part2 } from "./index";

const testLines = ``.split("\n");

describe("Day 09", () => {
  describe("Part 1", () => {
    it("works", () => {
      expect(part1(testLines)).toBe(0);
    });
  });
  describe("Part 2", () => {
    it("works", () => {
      expect(part2(testLines)).toBe(0);
    });
  });
});
