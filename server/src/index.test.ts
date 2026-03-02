import { expect, test, describe } from "bun:test";

describe("testing", () => {
  test("should pass to verify CI working", () => {
    expect(1 + 1).toBe(2);
  });
});