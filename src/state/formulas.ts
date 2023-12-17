export type Outcome = {
  value: number;
  probability: number;
};

export const calculateExpectedValue = (outcomes: Outcome[]) =>
  outcomes.reduce(
    (acc, { value, probability }) => acc + value * probability,
    0
  );

// EV of P1, P1 Bets AA, P2 Calls
export const calculateP1EV_P1BetAA_P2Call = ({
  potSize,
  betSize,
  probabilityOfP2Call,
}: {
  potSize: number;
  betSize: number;
  probabilityOfP2Call: number;
}) => {
  const winAmount = potSize + betSize;

  return calculateExpectedValue([
    { value: winAmount, probability: probabilityOfP2Call },
  ]);
};
