import { calculateAlpha, calculateMDF } from "../atoms";

const BET_TYPES = {
  HALF_POT: "half-size pot bet",
  FULL_POT: "full-size pot bet",
  OVERBET_2X: "2x overbet",
} as const;

describe("should calculate Alpha", () => {
  test.each([
    {
      desc: BET_TYPES.HALF_POT,
      potSize: 100,
      betSize: 50,
      expectedAlpha: 1 / 3,
    },
    {
      desc: BET_TYPES.FULL_POT,
      potSize: 100,
      betSize: 100,
      expectedAlpha: 1 / 2,
    },
    {
      desc: BET_TYPES.OVERBET_2X,
      potSize: 100,
      betSize: 200,
      expectedAlpha: 2 / 3,
    },
  ])(
    "for potSize: $potSize & betSize: $betSize",
    ({ potSize, betSize, expectedAlpha }) => {
      expect(calculateAlpha(potSize, betSize)).toBe(expectedAlpha);
    }
  );
});

describe("should calculate Minimun Defence Frequencies", () => {
  test.each([
    {
      desc: BET_TYPES.HALF_POT,
      potSize: 100,
      betSize: 50,
      expectedAlpha: 1 - 1 / 3,
    },
    {
      desc: BET_TYPES.FULL_POT,
      potSize: 100,
      betSize: 100,
      expectedAlpha: 1 - 1 / 2,
    },
    {
      desc: BET_TYPES.OVERBET_2X,
      potSize: 100,
      betSize: 200,
      expectedAlpha: 1 - 2 / 3,
    },
  ])(
    "for potSize: $potSize & betSize: $betSize",
    ({ potSize, betSize, expectedAlpha }) => {
      expect(calculateMDF(potSize, betSize)).toBe(expectedAlpha);
    }
  );
});
