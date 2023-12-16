import {
  calculateAlpha,
  calculateMDF,
  calculateP1EV_P1_BET_AA_P2_CALL,
} from "../atoms";

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

describe("should calculate Expected Values of P1 Betting Aces and P2 Calling a.k.a P1EV_P1_BET_AA_P2_CALL", () => {
  const testCases: Array<{
    desc?: string;
    args: Parameters<typeof calculateP1EV_P1_BET_AA_P2_CALL>[number];
    expectedValue: number;
  }> = [
    {
      desc: BET_TYPES.HALF_POT,
      args: {
        potSize: 100,
        betSize: 50,
        probabilityOfP2Call: 2 / 3,
      },
      expectedValue: 100,
    },
    {
      desc: BET_TYPES.FULL_POT,
      args: {
        potSize: 100,
        betSize: 100,
        probabilityOfP2Call: 0.5,
      },
      expectedValue: 100,
    },
    {
      desc: BET_TYPES.OVERBET_2X,
      args: {
        potSize: 100,
        betSize: 200,
        probabilityOfP2Call: 1 / 3,
      },
      expectedValue: 100,
    },
  ];

  test.each(testCases)(
    "for $desc and probality of P2 Call: $args.probabilityOfP2Call",
    ({ args, expectedValue }) => {
      expect(calculateP1EV_P1_BET_AA_P2_CALL(args)).toBe(expectedValue);
    }
  );
});
