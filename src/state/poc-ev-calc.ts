export const actions = { check: "X", bet: "B", fold: "F" } as const;

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
  const frequencyOfHand = 1 / p1Range.length;

  return calcP1EV_AA() * frequencyOfHand + calcP1EV_QQ() * frequencyOfHand;
};

// EVs of P1's Hands
export const calcP1EV_AA = () => {
  return calcP1EV_AA_Bet();
};

export const calcP1EV_QQ = () => {
  const bluffFreq = 0.5;
  return caclP1EV_QQ_Bet() * bluffFreq + calcP1EV_QQ_Check() * (1 - bluffFreq);
};

// P1 Hand -> P1 Actions
export const calcP1EV_AA_Bet = () => {
  const callFreq = 0.5;
  return (
    calcP1EV_AA_Bet_Call() * callFreq + calcP1EV_AA_Bet_Fold() * (1 - callFreq)
  );
};

export const caclP1EV_QQ_Bet = () => {
  const callFreq = 0.5;
  return (
    calcP1EV_QQ_Bet_Call() * (1 - callFreq) + calcP1EV_QQ_Bet_Fold() * callFreq
  );
};

export const calcP1EV_QQ_Check = () => {
  return 0;
};

// P1 Actions -> P2 Responses (Actions)
export const calcP1EV_AA_Bet_Call = () => {
  const potSize = 100;
  const betSize = 100;

  const winAmount = potSize + betSize;
  return winAmount;
};

export const calcP1EV_AA_Bet_Fold = () => {
  const potSize = 100;
  return potSize;
};

export const calcP1EV_QQ_Bet_Call = () => {
  const betSize = 100;
  return -betSize;
};

export const calcP1EV_QQ_Bet_Fold = () => {
  const potSize = 100;
  return potSize;
};
