import { describe, it, expect } from "vitest";
import {
  countNeighboringRolls,
  getNeighborCoords,
  parseDiagram,
  part1,
  part2,
} from "./index";

const testLines = `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`.split("\n");

describe("Day 04", () => {
  describe("parseDiagram", () => {
    it("works", () => {
      const { width, height, rollsCoords } = parseDiagram(testLines);
      expect(width).toBe(10);
      expect(height).toBe(10);
      expect(rollsCoords.has("0,1")).toBe(true);
      expect(rollsCoords.has("2,0")).toBe(true);
      expect(rollsCoords.has("0,0")).toBe(false);
      expect(rollsCoords.has("9,9")).toBe(false);
    });
  });

  describe("getNeighborCoords", () => {
    it("works in the top left corner", () => {
      const neighborCoords = getNeighborCoords(
        { x: 0, y: 0 },
        { width: 5, height: 5 }
      );

      expect(neighborCoords.length).toBe(3);
      expect(neighborCoords).toContainEqual({ x: 0, y: 1 });
      expect(neighborCoords).toContainEqual({ x: 1, y: 1 });
      expect(neighborCoords).toContainEqual({ x: 1, y: 0 });
    });

    it("works in the middle", () => {
      const neighborCoords = getNeighborCoords(
        { x: 1, y: 1 },
        { width: 3, height: 3 }
      );

      expect(neighborCoords.length).toBe(8);
      expect(neighborCoords).toContainEqual({ x: 0, y: 0 });
      expect(neighborCoords).toContainEqual({ x: 0, y: 1 });
      expect(neighborCoords).toContainEqual({ x: 0, y: 2 });
      expect(neighborCoords).toContainEqual({ x: 1, y: 0 });
      expect(neighborCoords).toContainEqual({ x: 1, y: 2 });
      expect(neighborCoords).toContainEqual({ x: 2, y: 0 });
      expect(neighborCoords).toContainEqual({ x: 2, y: 1 });
      expect(neighborCoords).toContainEqual({ x: 2, y: 2 });
    });

    it("works in the bottom right corner", () => {
      const neighborCoords = getNeighborCoords(
        { x: 4, y: 4 },
        { width: 5, height: 5 }
      );

      expect(neighborCoords.length).toBe(3);
      expect(neighborCoords).toContainEqual({ x: 3, y: 4 });
      expect(neighborCoords).toContainEqual({ x: 3, y: 3 });
      expect(neighborCoords).toContainEqual({ x: 4, y: 3 });
    });
  });

  describe("countNeighboringRolls", () => {
    it("works", () => {
      const diagram = parseDiagram(testLines);
      expect(countNeighboringRolls({ x: 0, y: 0 }, diagram)).toBe(2);
    });
  });

  describe("Part 1", () => {
    it("works", () => {
      expect(part1(testLines)).toBe(13);
    });
  });

  describe("Part 2", () => {
    it("works", () => {
      expect(part2(testLines)).toBe(43);
    });
  });
});
