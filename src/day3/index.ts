import { getInputFile, logResults } from '../utils';
const input = getInputFile('day3');

const LOWERCASE_CHAR_CODE_OFFSET = 96;
const UPPERCASE_CHAR_CODE_OFFSET = 38;

const rucksacks = input.split('\n');

const getCompartments = (rucksack: string) => {
  const splitIndex = rucksack.length / 2;
  return [rucksack.slice(0, splitIndex), rucksack.slice(splitIndex)];
};

const getIntersection = (arrays: string[]) => {
  // an array using Set (to remove duplicates) of the characters (items) to match in the
  // other item strings
  const itemsToMatch = [...new Set(arrays[0].split(''))];
  return arrays.reduce<string[]>(
    (a, b) => a.filter((c) => b.includes(c)),
    itemsToMatch
  );
};

const getPriority = (item: string) => {
  const itemCharCode = item.charCodeAt(0);
  if (item === item.toLowerCase())
    return itemCharCode - LOWERCASE_CHAR_CODE_OFFSET;
  return itemCharCode - UPPERCASE_CHAR_CODE_OFFSET;
};

const getIntersectionPriority = (intersection: string[]) =>
  intersection.reduce((acc, value) => acc + getPriority(value), 0);

const part1 = () =>
  rucksacks.reduce((currentPriority, rucksack) => {
    const [compartment1, compartment2] = getCompartments(rucksack);
    const intersection = getIntersection([compartment1, compartment2]);
    return currentPriority + getIntersectionPriority(intersection);
  }, 0);

const part2 = () => {
  let totalPriority = 0;
  for (let i = 0; i < rucksacks.length; i += 3) {
    totalPriority += getIntersectionPriority(
      getIntersection(rucksacks.slice(i, i + 3))
    );
  }
  return totalPriority;
};

logResults(part1, part2);
