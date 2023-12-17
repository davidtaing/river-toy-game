import {
  Outcome,
  calculateExpectedValue,
  calculateP1EV_P1AA,
  calculateP1EV_P1BetAA_P2Fold,
} from "../formulas";

describe("calculate Expected Value", () => {
  const testCases: {
    desc: string;
    outcomes: Outcome[];
    expected: number;
  }[] = [
    {
      desc: "when given an empty array of outcomes",
      outcomes: [],
      expected: 0,
    },
    {
      desc: "when given an single positive outcome",
      outcomes: [{ value: 100, probability: 1 }],
      expected: 100,
    },
    {
      desc: "when given an single negative outcome",
      outcomes: [{ value: -100, probability: 1 }],
      expected: -100,
    },
    {
      // debated on whether or not to throw an error.
      // decided not to throw and instead handle this as a "normal" case.
      // may elect to go with an "ok, err" pattern in the future.
      desc: "when given an probabilities that do not add up to 100%",
      outcomes: [
        { value: 100, probability: 0.25 },
        { value: 200, probability: 0.25 },
      ],
      expected: 75,
    },
    {
      desc: "when given outcomes modelling a coin flip",
      outcomes: [
        { value: 100, probability: 0.5 },
        { value: -100, probability: 0.5 },
      ],
      expected: 0,
    },
    {
      desc: "when given outcomes modelling a dice throw",
      outcomes: [
        { value: 1, probability: 1 / 6 },
        { value: 2, probability: 1 / 6 },
        { value: 3, probability: 1 / 6 },
        { value: 4, probability: 1 / 6 },
        { value: 5, probability: 1 / 6 },
        { value: 6, probability: 1 / 6 },
      ],
      expected: 3.5,
    },
  ];

  test.each(testCases)("$desc", ({ outcomes, expected }) => {
    const expectedValue = calculateExpectedValue(outcomes);
    expect(expectedValue).toBe(expected);
  });
});

describe("calculate expected value for P1, when P1 bets AA and P2 folds", () => {
  const testCases: ({
    desc: string;
    expectedValue: number;
  } & Parameters<typeof calculateP1EV_P1BetAA_P2Fold>[number])[] = [
    {
      desc: "P2 folds 0%",
      potSize: 100,
      pP2Fold: 0,
      expectedValue: 0,
    },
    {
      desc: "P2 folds 50%",
      potSize: 100,
      pP2Fold: 0.5,
      expectedValue: 50,
    },
    {
      desc: "P2 folds 100%",
      potSize: 100,
      pP2Fold: 1,
      expectedValue: 100,
    },
  ];

  test.each(testCases)("%o", ({ potSize, pP2Fold, expectedValue }) => {
    const actual = calculateP1EV_P1BetAA_P2Fold({ potSize, pP2Fold });
    expect(actual).toBe(expectedValue);
  });
});

describe("calculate expected value for P1, when P1 has AA", () => {
  const testCases: {
    desc: string;
    args: Parameters<typeof calculateP1EV_P1AA>[number];
    expectedValue: number;
  }[] = [
    {
      desc: "P2 calls 0%",
      args: { outcomes: [150, 0], pP2Call: 0 } as const,
      expectedValue: 0,
    },
    {
      desc: "P2 calls 50%",
      args: { outcomes: [150, 0], pP2Call: 0.5 } as const,
      expectedValue: 75,
    },
  ];

  test.each(testCases)("%o", ({ args, expectedValue }) => {
    const actual = calculateP1EV_P1AA(args);
    expect(actual).toBe(expectedValue);
  });
});
