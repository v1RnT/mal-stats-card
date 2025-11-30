import { describe, it, expect } from "vitest";

describe("Stats Math", () => {
  it("calculates percentages correctly", () => {
    const total = 100;
    const watched = 50;
    const percentage = (watched / total) * 100;

    expect(percentage).toBe(50);
  });
});
