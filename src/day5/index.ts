import { getInputFile, logResults } from '../utils';
const input = getInputFile('day5');

const [initialRawConfig, rawInstructions] = input.split('\n\n');

const parseStackConfig = (rawConfig: string) => {
  const rawStacks = rawConfig.split('\n');
  const [stackIds] = rawStacks.splice(-1, 1);
  const stacks = stackIds.match(/\d/g)?.map(() => []) as string[][];

  rawStacks.forEach((row) => {
    const rowValues = row.match(/[ ]{4}|[\w]/g) as string[];
    stacks.forEach((_, index) => {
      const value = rowValues[index].trim();
      if (value) {
        stacks[index].push(value);
      }
    });
  });

  return stacks;
};

const parseInstructions = (
  instructions: string[],
  stacks: string[][],
  crateMoverVersion: '9000' | '9001'
) => {
  instructions.forEach((instruction, index) => {
    const [moveAmount, moveFrom, moveTo] = instruction
      .match(/\d+/g)
      ?.map(Number) as number[];
    const movedCrates = stacks[moveFrom - 1].splice(0, moveAmount);

    // the older model can only move crates 1 by 1, so reverse
    // the order to reflect that
    if (crateMoverVersion === '9000') movedCrates.reverse();

    stacks[moveTo - 1] = [...movedCrates, ...stacks[moveTo - 1]];
  });
  return stacks.map((stack) => stack[0]).join('');
};

const part1 = () => {
  const instructions = rawInstructions.split('\n');
  const stacks = parseStackConfig(initialRawConfig);
  parseInstructions(instructions, stacks, '9000');
  return stacks.map((stack) => stack[0]).join('');
};

const part2 = () => {
  const instructions = rawInstructions.split('\n');
  const stacks = parseStackConfig(initialRawConfig);
  parseInstructions(instructions, stacks, '9001');
  return stacks.map((stack) => stack[0]).join('');
}

logResults(part1, part2)
