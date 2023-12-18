export const actions = { check: "X", bet: "B", fold: "F" } as const;

// Naively writing an implemenation for the EV calculation of P2
export const calcP1EV = ({
  potSize,
  betSize,
  betFreq,
  callFreq,
  p1Range = ["AA", "QQ"],
  p2Range = ["KK"],
  board = ["3c", "3s", "3d", "2d", "2h"],
}: {
  potSize: number;
  betSize: number;
  betFreq: number;
  callFreq: number;
  p1Range: string[];
  p2Range: string[];
  board: string[];
}) => {
  /**
   * For each P1 Hand
   *  For each P1 Action
   *    For each P2 Hand
   *      For each P2 Action
   */

  /**
   * Naive Approach:
   *
   * 1. Get EV of P1 which consists of the sum of 1.1 & 1.2
   *
   *  1.1. Get EV of AA which consists of the sum of:
   *    - Get EV of AA -> Bet -> Call
   *    - Get EV of AA -> Bet -> Fold
   *    - Get EV of AA -> Check -> Check (Ignoring this branch for now since P1 should never check)
   *    - Get EV of AA -> Check -> Bet -> Call / Fold (Ignoring this branch for now since P1 should never check)
   *
   *  1.2. Get EV of QQ which consists of the sum of:
   *    - Get EV of QQ -> Bet -> Call
   *    - Get EV of QQ -> Bet -> Fold
   *    - Get EV of QQ -> Check -> Check
   *    - Get EV of QQ -> Check -> Bet -> Call / Fold (Ignoring this branch for now since P2 should never bet here)
   */

  return 75;
};
