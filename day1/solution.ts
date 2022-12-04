// Note: Solution was modified following the part two prompt to accomodate the requirements of
// both challenges.
const fs = require('fs');
const input = fs.readFileSync(__dirname + '/input.txt', 'utf8') as string;

// an array of the total calories of each elf
const arrayOfCalories = input
  .split('\n\n')
  .map((calories) =>
    (calories.match(/\d+/g) as string[]).reduce((acc, calorie) => {
      return acc + parseInt(calorie, 10);
    }, 0)
  )
  .sort((a, b) => b - a);
const maxCalories = arrayOfCalories[0];
const topThreeCalories = arrayOfCalories
  .slice(0, 3)
  .reduce((acc, calorie) => acc + calorie);
