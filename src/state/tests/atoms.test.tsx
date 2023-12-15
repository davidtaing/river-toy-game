import { calculateAlpha } from "../atoms";

describe("calculateAlpha / alphaAtom", () => {
  test.each([
    { potSize: 100, betSize: 50, expectedAlpha: 1 / 3 },
    { potSize: 100, betSize: 100, expectedAlpha: 1 / 2 },
    { potSize: 100, betSize: 200, expectedAlpha: 2 / 3 },
  ])(
    "should calculate alpha for potSize: $potSize and betSize: $betSize",
    ({ potSize, betSize, expectedAlpha }) => {
      expect(calculateAlpha(potSize, betSize)).toBe(expectedAlpha);
    }
  );
});
