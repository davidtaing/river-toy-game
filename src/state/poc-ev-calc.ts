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

const OUTCOME_CALCULATIONS = {
  P1_BLUFF_FOLD: (potSize: number) => potSize,
  P1_BLUFF_CALL: (betSize: number) => -betSize,
  P1_VALUEBET_CALL: (betSize: number, potSize: number) => betSize + potSize,
  P1_VALUEBET_FOLD: (potSize: number) => potSize,
  P1_CHECK: () => 0,
  P2_CALL_BLUFF: (betSize: number, potSize: number) => betSize + potSize,
  P2_CALL_VALUEBET: (betSize: number) => -betSize,
  P2_CHECK: (potSize: number) => potSize,
  FOLD: () => 0,
} as const;

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

  const result =
    calcP1EV_AA({ potSize, betSize, callFreq }) * frequencyOfHand +
    calcP1EV_QQ({ potSize, betSize, bluffFreq, callFreq }) * frequencyOfHand;

  return Number(result.toFixed(2));
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
  const evBet = calcP1EV_QQ_Bet({ potSize, betSize, callFreq });
  const evCheck = calcP1EV_QQ_Check();

  return evBet * bluffFreq + evCheck * (1 - bluffFreq);
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
    calcP1EV_AA_Bet_Call(betSize, potSize) * callFreq +
    calcP1EV_AA_Bet_Fold(potSize) * (1 - callFreq)
  );
};

export const calcP1EV_QQ_Bet = ({
  potSize,
  betSize,
  callFreq,
}: {
  potSize: number;
  betSize: number;
  callFreq: number;
}) => {
  const evBetCall = calcP1EV_QQ_Bet_Call(betSize);
  const evBetFold = calcP1EV_QQ_Bet_Fold(potSize);
  const result = evBetCall * callFreq + evBetFold * (1 - callFreq);

  return Number(result.toFixed(2));
};

export const calcP1EV_QQ_Check = OUTCOME_CALCULATIONS.P1_CHECK;

// P1 Actions -> P2 Responses (Actions)
export const calcP1EV_AA_Bet_Call = OUTCOME_CALCULATIONS.P1_VALUEBET_CALL;
export const calcP1EV_AA_Bet_Fold = OUTCOME_CALCULATIONS.P1_VALUEBET_FOLD;
export const calcP1EV_QQ_Bet_Call = OUTCOME_CALCULATIONS.P1_BLUFF_CALL;
export const calcP1EV_QQ_Bet_Fold = OUTCOME_CALCULATIONS.P1_BLUFF_FOLD;

/**
 * Player 2's EV Calculations
 *
 * Naive Approach:
 *
 * 1. Get EV of P2 which consists of 1.1
 *  1.1. Get EV of KK which consists of the sum of:
 *    - Get EV of KK -> Calling Against AA
 *    - Get EV of KK -> Folding Against AA = 0EV
 *    - Get EV of KK -> Calling Against QQ
 *    - Get EV of KK -> Folding Against QQ = 0EV
 *    - Get EV of KK -> Checking Behind after P1 Checks
 */

export const calcP2EV = ({
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
  const frequencyOfHand = 1 / p2Range.length;
  const frequencyOfP1Hand = 1 / p1Range.length;

  const result =
    calcP2EV_KK({ potSize, betSize, bluffFreq, callFreq, frequencyOfP1Hand }) *
    frequencyOfHand;

  return Number(result.toFixed(2));
};

export const calcP2EV_KK = ({
  potSize,
  betSize,
  bluffFreq,
  callFreq,
  frequencyOfP1Hand,
}: {
  potSize: number;
  betSize: number;
  bluffFreq: number;
  callFreq: number;
  frequencyOfP1Hand: number;
}) => {
  return (
    calcP2EV_KK_vs_AA({ betSize, callFreq }) * frequencyOfP1Hand +
    calcP2EV_KK_vs_QQ({ potSize, betSize, bluffFreq, callFreq }) *
      frequencyOfP1Hand
  );
};

export const calcP2EV_KK_vs_AA = ({
  betSize,
  callFreq,
}: {
  betSize: number;
  callFreq: number;
}) => {
  return (
    calcP2EV_KK_Call_vs_AA_Bet(betSize) * callFreq +
    calcP2EV_KK_Fold_vs_AA_Bet() * (1 - callFreq)
  );
};
export const calcP2EV_KK_vs_QQ = ({
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
    calcP2EV_KK_Call_vs_QQ_Bet(betSize, potSize) * callFreq * bluffFreq +
    calcP2EV_KK_Fold_vs_QQ_Bet() * (1 - callFreq) * bluffFreq +
    calcP2EV_KK_Check_vs_QQ_Check(potSize) * (1 - bluffFreq)
  );
};

export const calcP2EV_KK_Call_vs_AA_Bet = OUTCOME_CALCULATIONS.P2_CALL_VALUEBET;
export const calcP2EV_KK_Fold_vs_AA_Bet = OUTCOME_CALCULATIONS.FOLD;
export const calcP2EV_KK_Call_vs_QQ_Bet = OUTCOME_CALCULATIONS.P2_CALL_BLUFF;
export const calcP2EV_KK_Fold_vs_QQ_Bet = OUTCOME_CALCULATIONS.FOLD;
export const calcP2EV_KK_Check_vs_QQ_Check = OUTCOME_CALCULATIONS.P2_CHECK;
