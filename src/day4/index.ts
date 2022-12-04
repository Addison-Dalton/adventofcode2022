import { getInputFile, logResults } from '../utils';
const input = getInputFile('day4');

const pairs = input
  .split('\n')
  .map((pair) => pair.split(',').map((range) => range.split('-').map(Number)));

const completelyOverlap = (pair1: number[], pair2: number[]) =>
  (pair1[0] <= pair2[0] && pair1[1] >= pair2[1]) ||
  (pair1[0] >= pair2[0] && pair1[1] <= pair2[1]);

const partiallyOverlap = (pair1: number[], pair2: number[]) =>
  !(pair1[0] > pair2[1] || pair2[0] > pair1[1]);

// completely overlapping pairs
const part1 = () =>
  pairs.filter((pair) => completelyOverlap(pair[0], pair[1])).length;

// partially overlap
const part2 = () =>
  pairs.filter((pair) => partiallyOverlap(pair[0], pair[1])).length;

logResults(part1, part2);
