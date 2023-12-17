export type Outcome = {
  value: number;
  probability: number;
};

export const calculateExpectedValue = (outcomes: Outcome[]) =>
  outcomes.reduce(
    (acc, { value, probability }) => acc + value * probability,
    0
  );

/**
 * Calculates the expected value (EV) of Player 1 (P1) when P1 bets AA and Player 2 (P2) calls.
 *
 * @param {Object} options - The options for calculating the EV.
 * @param {number} options.potSize - The size of the pot.
 * @param {number} options.betSize - The size of the bet made by P1.
 * @param {number} options.pP2Call - The probability of P2 calling the bet.
 * @returns {number} The expected value (EV) of P1 beting aces and P2 calling.
 */
export const calculateP1EV_P1BetAA_P2Call = ({
  potSize,
  betSize,
  pP2Call,
}: {
  potSize: number;
  betSize: number;
  pP2Call: number;
}) => {
  const winAmount = potSize + betSize;
  return calculateExpectedValue([{ value: winAmount, probability: pP2Call }]);
};

/**
 * Calculates the expected value (EV) of Player 1 (P1) when P1 bets AA and Player 2 (P2) folds.
 *
 * @param {Object} options - The options for calculating the EV.
 * @param {number} options.potSize - The size of the pot.
 * @param {number} options.pP2Fold - The probability of P2 folding.
 * @returns {number} The expected value (EV) of P1 betting aces and P2 folding.
 */
export const calculateP1EV_P1BetAA_P2Fold = ({
  potSize,
  pP2Fold,
}: {
  potSize: number;
  pP2Fold: number;
}) => {
  const winAmount = potSize;
  return calculateExpectedValue([{ value: winAmount, probability: pP2Fold }]);
};

export const calculateP1EV_P1AA = ({
  outcomes,
  pP2Call,
}: {
  outcomes: [evP2Call: number, evP2Fold: number];
  pP2Call: number;
}) => {
  const [evP2Call, evP2Fold] = outcomes;

  return calculateExpectedValue([
    { value: evP2Call, probability: pP2Call },
    { value: evP2Fold, probability: 1 - pP2Call },
  ]);
};

export const calculateOutcome_Bet_Call = (potSize: number, betSize: number) =>
  potSize + betSize;

export const calculateOutcome_Bet_Fold = (potSize: number) => potSize;
