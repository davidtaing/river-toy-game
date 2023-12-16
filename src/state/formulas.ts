export type Outcome = {
  value: number;
  probability: number;
};

export const calculateExpectedValue = (outcomes: Outcome[]) =>
  outcomes.reduce(
    (acc, { value, probability }) => acc + value * probability,
    0
  );
