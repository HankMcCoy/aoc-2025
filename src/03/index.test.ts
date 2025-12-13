import { describe, it, expect } from "vitest";
import { getBankJoltage, part1, part2 } from "./index";

const testLines = `987654321111111
811111111111119
234234234234278
818181911112111`.split("\n");

describe("Day 03", () => {
  describe("getBankJoltage", () => {
    it("works", () => {
      expect(getBankJoltage("987654321111111")).toBe(98);
      expect(getBankJoltage("811111111111119")).toBe(89);
    });
  });
  describe("Part 1", () => {
    it("works", () => {
      expect(part1(testLines)).toBe(357);
    });
  });
  describe("Part 2", () => {
    it("works", () => {
      expect(part2(testLines)).toBe(3121910778619);
    });
  });
});
