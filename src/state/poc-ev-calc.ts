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
  bluffFreq,
  callFreq,
  p1Range = ["AA", "QQ"],
  p2Range = ["KK"],
  board = ["3c", "3s", "3d", "2d", "2h"],
}: {
  potSize: number;
  betSize: number;
  bluffFreq: number;
  callFreq: number;
  p1Range: string[];
  p2Range: string[];
  board: string[];
}) => {
  const frequencyOfHand = 1 / p1Range.length;

  return (
    calcP1EV_AA({ potSize, betSize, callFreq }) * frequencyOfHand +
    calcP1EV_QQ({ potSize, betSize, bluffFreq, callFreq }) * frequencyOfHand
  );
};

// EVs of P1's Hands
export const calcP1EV_AA = ({
  potSize,
  betSize,
  callFreq,
}: {
  potSize: number;
  betSize: number;
  callFreq: number;
}) => {
  return calcP1EV_AA_Bet({ potSize, betSize, callFreq });
};

export const calcP1EV_QQ = ({
  potSize,
  betSize,
  bluffFreq,
  callFreq,
}: {
  potSize: number;
  betSize: number;
  bluffFreq: number;
  callFreq: number;
}) => {
  return (
    caclP1EV_QQ_Bet({ potSize, betSize, callFreq }) * bluffFreq +
    calcP1EV_QQ_Check() * (1 - bluffFreq)
  );
};

// P1 Hand -> P1 Actions
export const calcP1EV_AA_Bet = ({
  potSize,
  betSize,
  callFreq,
}: {
  potSize: number;
  betSize: number;
  callFreq: number;
}) => {
  return (
    calcP1EV_AA_Bet_Call({ potSize, betSize }) * callFreq +
    calcP1EV_AA_Bet_Fold({ potSize }) * (1 - callFreq)
  );
};

export const caclP1EV_QQ_Bet = ({
  potSize,
  betSize,
  callFreq,
}: {
  potSize: number;
  betSize: number;
  callFreq: number;
}) => {
  return (
    calcP1EV_QQ_Bet_Call({ betSize }) * (1 - callFreq) +
    calcP1EV_QQ_Bet_Fold({ potSize }) * callFreq
  );
};

export const calcP1EV_QQ_Check = () => {
  return 0;
};

// P1 Actions -> P2 Responses (Actions)
export const calcP1EV_AA_Bet_Call = ({
  potSize,
  betSize,
}: {
  potSize: number;
  betSize: number;
}) => {
  const winAmount = potSize + betSize;
  return winAmount;
};

export const calcP1EV_AA_Bet_Fold = ({ potSize }: { potSize: number }) => {
  return potSize;
};

export const calcP1EV_QQ_Bet_Call = ({ betSize }: { betSize: number }) => {
  return -betSize;
};

export const calcP1EV_QQ_Bet_Fold = ({ potSize }: { potSize: number }) => {
  return potSize;
};
