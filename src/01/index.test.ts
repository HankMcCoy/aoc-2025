import { describe, it, expect } from "vitest";
import { applyInstr, part1, part2 } from "./index";

const testLines = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`.split("\n");

describe("Day 01", () => {
  describe("applyInstr", () => {
    it("works for a command that goes over 100", () => {
      expect(applyInstr(50, "L52")).toBe(2);
    });
    it("works for a command that goes under 0", () => {
      expect(applyInstr(50, "R52")).toBe(98);
    });
  });

  describe("Part 1", () => {
    it("works", () => {
      expect(part1(testLines)).toBe(3);
    });
  });
  describe("Part 2", () => {
    it("works", () => {
      expect(part2(testLines)).toBe(6);
    });
  });
});
