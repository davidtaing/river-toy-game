import { calcP1EV, calcP2EV } from "../poc-ev-calc";

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
