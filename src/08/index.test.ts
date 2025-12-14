import { describe, it, expect } from "vitest";
import { CoordStr, parseCoords, part1, part2 } from "./index";

const testLines = `162,817,812
57,618,57
906,360,560
592,479,940
352,342,300
466,668,158
542,29,236
431,825,988
739,650,466
52,470,668
216,146,977
819,987,18
117,168,530
805,96,715
346,949,466
970,615,88
941,993,340
862,61,35
984,92,344
425,690,689`.split("\n") as CoordStr[];

describe("Day 08", () => {
  describe("parseCoords", () => {
    it("works", () => {
      const coords = parseCoords(testLines);
      expect(coords.length).toBe(20);
      expect(coords[0]).toEqual({ x: 162, y: 817, z: 812 });
      expect(coords[19]).toEqual({ x: 425, y: 690, z: 689 });
    });
  });

  describe("Part 1", () => {
    it("works", () => {
      expect(part1(testLines, 10)).toBe(40);
    });
  });
  describe("Part 2", () => {
    it("works", () => {
      expect(part2(testLines)).toBe(25272);
    });
  });
});
