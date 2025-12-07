import { describe, it, expect } from "vitest";
import { createRange } from "./range";

describe("range", () => {
  it("works", () => {
    expect(createRange(12, 14)).toEqual([12, 13, 14]);
  });
});
