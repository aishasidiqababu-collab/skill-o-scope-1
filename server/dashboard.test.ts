import { describe, expect, it } from "vitest";
import { calculateReadiness, gapLabel } from "../shared/readiness";

describe("readiness scoring", () => {
  it("calculates a weighted, rounded readiness score", () => {
    expect(
      calculateReadiness([
        { score: 60, weight: 50 },
        { score: 80, weight: 50 },
      ]),
    ).toBe(70);
  });

  it("keeps scores within the 0–100 range", () => {
    expect(calculateReadiness([{ score: 140, weight: 1 }])).toBe(100);
    expect(calculateReadiness([{ score: -20, weight: 1 }])).toBe(0);
  });

  it("labels gaps transparently", () => {
    expect(gapLabel(80, 75)).toBe("Ready");
    expect(gapLabel(82, 85)).toBe("Small gap");
    expect(gapLabel(62, 75)).toBe("Moderate gap");
    expect(gapLabel(54, 80)).toBe("Major gap");
  });
});
