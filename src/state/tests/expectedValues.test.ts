import { Outcome, calculateExpectedValue } from "../formulas";

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
