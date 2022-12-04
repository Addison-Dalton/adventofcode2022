import fs from 'fs';
import path from 'path';

export const getInputFile = (day: string) =>
  fs.readFileSync(path.resolve(`inputs/${day}.txt`), 'utf8');

export const logResults = (part1: Function, part2: Function) =>
  console.log(`Part 1: ${part1()} \nPart 2: ${part2()}`);
