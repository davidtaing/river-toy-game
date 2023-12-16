/**
 * Terminology:
 * - Alpha: The frequency that P2 must call for your 0% equity bluffs to break even (as P1). If P2 calls less than alpha, P1's bluffs will be profitable.
 * - Minimum Defense Frequency (MDF): The frequency that P2 must call to prevent P1 from profiting by bluffing.
 * - Expected Value (EV): The average amount of money won or lost per hand.
 *   Calculated by multiplying the probability of all events by the expected outcome
 * - Probability (P): Frequency of an event occurring
 * - Bet (BET): The action of betting a certain amount of money by P1. Can be used to refer to the amount or the action.
 * - Bet Size: The amount of money bet by P1. Note: The money in the pot is considered dead and is not included in the bet size.
 * - Call (CALL): The action of matching a bet by P2.
 * - Fold (FOLD): The action of forfeiting the hand by P2.
 * - Check (CHECK): The action of not betting by P1.
 */
import { atom } from "jotai";
import { calculateExpectedValue } from "./formulas";

const potSizeAtom = atom(100);
const betSizeAtom = atom(100);
const bluffFreqAtom = atom(0.5);
const p2CallFreq = atom(0.5);
const p2FoldFreq = atom((get) => 1 - get(p2CallFreq));

export const calculateAlpha = (potSize: number, betSize: number) =>
  betSize / (betSize + potSize);

const alphaAtom = atom((get) =>
  calculateAlpha(get(potSizeAtom), get(betSizeAtom))
);

export const calculateMDF = (potSize: number, betSize: number) =>
  1 - calculateAlpha(potSize, betSize);

/**
 * Minimum Defense Frequency (MDF):
 *
 * The frequency that P2 must call to prevent P1 from profiting by bluffing.
 *
 * Calculated as 1 - Alpha
 *
 * If P2 defends more than the MDF (a.k.a Under Folding), P1 can exploit this / profit by bluffing less.
 * And if P2 defends less than the MDF (a.k.a Over Folding), P1 can exploit this / profit by bluffing more.
 */
const mdfAtom = atom((get) => calculateMDF(get(potSizeAtom), get(betSizeAtom)));

const potOddsAtom = atom((get) => {
  const potSize = get(potSizeAtom);
  const betSize = get(betSizeAtom);

  return betSize / (betSize * 2 + potSize);
});

// Probabilites
const pAAAtom = atom(0.5); // Probability of P1 having AA
const pQQAtom = atom(0.5); // Probability of P1 having QQ

// Expected Values
export const calculateP1EV_P1_BET_AA_P2_CALL = ({
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

const P1EV_P1_BET_AA_P2_CALL_ATOM = atom((get) => {
  calculateP1EV_P1_BET_AA_P2_CALL({
    potSize: get(potSizeAtom),
    betSize: get(betSizeAtom),
    probabilityOfP2Call: get(p2CallFreq),
  });
});

const P1EV_P1_BET_AA_P2_FOLD_ATOM = atom(0);
const P1EV_P1_AA_ATOM = atom(0);
const P1EV_P1_BET_QQ_P2_CALL_ATOM = atom(0);
const P1EV_P1_BET_QQ_P2_FOLD_ATOM = atom(0);
const P1EV_P1_QQ_ATOM = atom(0);
const P1EV_ATOM = atom(0);

const P2EV_P1_BET_AA_P2_CALL_ATOM = atom(0);
const P2EV_P1_BET_AA_P2_FOLD_ATOM = atom(0);
const P2EV_P1_BET_QQ_P2_CALL_ATOM = atom(0);
const P2EV_P1_BET_QQ_P2_FOLD_ATOM = atom(0);
const P2EV_ATOM = atom(0);
