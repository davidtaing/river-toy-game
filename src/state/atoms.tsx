import { atom } from "jotai";

const potSizeAtom = atom(100);
const betSizeAtom = atom(100);
const bluffFreqAtom = atom(0.5);
const p2CallFreq = atom(0.5);
const p2FoldFreq = atom(get => 1 - get(p2CallFreq));

const calculateAlpha = (potSize: number, betSize: number) => betSize / (betSize + potSize);

const alphaAtom = atom((get) => 
  calculateAlpha(get(potSizeAtom), get(betSizeAtom))
);

const minimumDefenseFrequencyAtom = atom((get) => 1 - get(alphaAtom));

const potOddsAtom = atom((get) => {
  const potSize = get(potSizeAtom);
  const betSize = get(betSizeAtom);

  return betSize / (betSize * 2 + potSize);
});

/**
 * Expected Values
 * 
 * Terminology:
 * - Expected Value (EV): The average amount of money won or lost per hand. 
 *   Calculated by multiplying the probability of all events by the expected outcome
 * - Probability (P): Frequency of an event occurring
 * - Bet (BET): The action of betting a certain amount of money by P1. Can be used to refer to the amount or the action.
 * - Call (CALL): The action of matching a bet by P2.
 * - Fold (FOLD): The action of forfeiting the hand by P2.
 * - Check (CHECK): The action of not betting by P1.
 */

const P1EV_P1_BET_AA_P2_CALL_ATOM = atom(0);
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