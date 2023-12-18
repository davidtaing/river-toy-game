import {
  Outcome,
  calcP1EV,
  calcP1EV_QQ,
  calcP2EV,
  calculateExpectedValue,
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

describe("Calculate P1's EV", () => {
  it("returns EV of 75 for a standard toy-game", () => {
    const actual = calcP1EV({
      potSize: 100,
      betSize: 100,
      bluffFreq: 0.5,
      callFreq: 0.5,
      p1Range: ["AA", "QQ"],
      p2Range: ["KK"],
      board: ["3c", "3s", "3d", "2d", "2h"],
    });
    const expected = 75;
    expect(actual).toEqual(expected);
  });

  it("returns EV of 83.33 for a 2x overbet toy-game", () => {
    const actual = calcP1EV({
      potSize: 100,
      betSize: 200,
      bluffFreq: 2 / 3,
      callFreq: 1 / 3,
      p1Range: ["AA", "QQ"],
      p2Range: ["KK"],
      board: ["3c", "3s", "3d", "2d", "2h"],
    });
    const expected = 83.33;
    expect(actual).toEqual(expected);
  });

  it("returns EV of 87.5 for a 3x overbet toy-game", () => {
    const actual = calcP1EV({
      potSize: 100,
      betSize: 300,
      bluffFreq: 3 / 4,
      callFreq: 1 / 4,
      p1Range: ["AA", "QQ"],
      p2Range: ["KK"],
      board: ["3c", "3s", "3d", "2d", "2h"],
    });
    const expected = 87.5;
    expect(actual).toEqual(expected);
  });
});

describe("Calculate P1's EV of holding QQ", () => {
  test("EV is 0 for a standard toy-game", () => {
    const actual = calcP1EV_QQ({
      potSize: 100,
      betSize: 100,
      bluffFreq: 0.5,
      callFreq: 0.5,
    });
    const expected = 0;
    expect(actual).toEqual(expected);
  });

  test("EV is 0 for a 2x overbet toy-game", () => {
    const actual = calcP1EV_QQ({
      potSize: 100,
      betSize: 200,
      bluffFreq: 2 / 3,
      callFreq: 1 / 3,
    });
    const expected = 0;
    expect(actual).toEqual(expected);
  });

  test("EV is 0 for a 3x overbet toy-game", () => {
    const actual = calcP1EV_QQ({
      potSize: 100,
      betSize: 300,
      bluffFreq: 3 / 4,
      callFreq: 1 / 4,
    });
    const expected = 0;
    expect(actual).toEqual(expected);
  });
});

describe("Calculate P2's EV", () => {
  it("returns EV of 25 for a standard toy-game", () => {
    const actual = calcP2EV({
      potSize: 100,
      betSize: 100,
      bluffFreq: 0.5,
      callFreq: 0.5,
      p1Range: ["AA", "QQ"],
      p2Range: ["KK"],
      board: ["3c", "3s", "3d", "2d", "2h"],
    });
    const expected = 25;
    expect(actual).toEqual(expected);
  });

  it("returns EV of 16.67 for a 2x overbet toy-game", () => {
    const actual = calcP2EV({
      potSize: 100,
      betSize: 200,
      bluffFreq: 2 / 3,
      callFreq: 1 / 3,
      p1Range: ["AA", "QQ"],
      p2Range: ["KK"],
      board: ["3c", "3s", "3d", "2d", "2h"],
    });
    const expected = 16.67;
    expect(actual).toEqual(expected);
  });

  it("returns EV of 12.50 for a 3x overbet toy-game", () => {
    const actual = calcP2EV({
      potSize: 100,
      betSize: 300,
      bluffFreq: 3 / 4,
      callFreq: 1 / 4,
      p1Range: ["AA", "QQ"],
      p2Range: ["KK"],
      board: ["3c", "3s", "3d", "2d", "2h"],
    });
    const expected = 12.5;
    expect(actual).toEqual(expected);
  });
});
