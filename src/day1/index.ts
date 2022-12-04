import { getInputFile, logResults } from '../utils';
const input = getInputFile('day1');

// an array of the total calories of each elf
const arrayOfCalories = input
  .split('\n\n')
  .map((calories) =>
    (calories.match(/\d+/g) as string[]).reduce((acc, calorie) => {
      return acc + parseInt(calorie, 10);
    }, 0)
  )
  .sort((a, b) => b - a);
const part1 = () => arrayOfCalories[0];
const part2 = () =>
  arrayOfCalories.slice(0, 3).reduce((acc, calorie) => acc + calorie);

logResults(part1, part2);
