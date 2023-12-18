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

  return 75;
};
