import { constructUrlParams } from "../src/lib/utils";

describe("constructUrlParams", () => {
  test("constructUrlParams ignores a property that has undefined", () => {
    expect(
      constructUrlParams({
        limit: 3,
        skip: undefined,
      }).toString()
    ).toBe("limit=3");
  });
});
