import { moneyCentsToDollars } from "../../scripts/utils/money.js";

describe("test suite: moneyCentsToDollars", () => {
  it("converts 2095 cents to $20.95", () => {
    expect(moneyCentsToDollars(2095)).toBe("$20.95");
  });

    it("converts 0 cents to $0.00", () => {
    expect(moneyCentsToDollars(0)).toBe("$0.00");
  });

  it("converts 2000.5 cents to $20.01", () => {
    expect(moneyCentsToDollars(2000.5)).toBe("$20.01");
  });
});