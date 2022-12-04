import fs from 'fs';
const input = fs.readFileSync(__dirname + '/input.txt', 'utf8') as string;

type GameOption = {
  keys: string[];
  score: number;
};
const WIN_SCORE = 6;
const DRAW_SCORE = 3;
const LOST_SCORE = 0;
const rock: GameOption = { keys: ['A', 'X'], score: 1 };
const paper: GameOption = { keys: ['B', 'Y'], score: 2 };
const scissor: GameOption = { keys: ['C', 'Z'], score: 3 };
const gameOptions = [rock, paper, scissor];
const gameRounds = input.split('\n');

// Determines if player 1 wins against player 2
// This uses the fact that the gameOption array is setup that an option loses
// to the next option, with the thought the last item loses to the first.
// With that, p1 wins if p2 choice index + 1 is the same.
// (Example: P1 chooses paper (index 1), and p2 chooses rock (index 0). 1 === 0 + 1 is true)
const determineRoundScore = (p1Index: number, p2Index: number) => {
  if (p1Index === p2Index) return DRAW_SCORE;
  if (p1Index === (p2Index + 1) % 3) return LOST_SCORE;
  return WIN_SCORE;
};

const getGameOptionIndex = (key: string) =>
  gameOptions.findIndex((option) => option.keys.includes(key));

const part1TotalScore = () =>
  gameRounds.reduce((currentScore, round) => {
    // hacky, but the format of the round is always player 1 + " " + player 2 (ex: "A Z")
    const p1Index = getGameOptionIndex(round[0]);
    const p2Index = getGameOptionIndex(round[2]);

    const roundScore = determineRoundScore(p1Index, p2Index);
    return currentScore + roundScore + gameOptions[p2Index].score;
  }, 0);

// This uses similar logic to determineRoundScore. It will determine
// the correct index (for p2Index) against p1Index to achieve a certain
// match result.
const getP2Index = (p1Index: number, outcomeKey: string) => {
  // Lose
  if (outcomeKey === 'X') return (p1Index + 2) % 3;
  // Draw
  if (outcomeKey === 'Y') return p1Index;
  // Win
  return (p1Index + 1) % 3;
};

const part2TotalScore = () =>
  gameRounds.reduce((currentScore, round) => {
    const p1Index = getGameOptionIndex(round[0]);
    const p2Index = getP2Index(p1Index, round[2]);
    const roundScore = determineRoundScore(p1Index, p2Index);
    return currentScore + roundScore + gameOptions[p2Index].score;
  }, 0);
