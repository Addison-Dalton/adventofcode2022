import { getInputFile, logResults } from '../utils';
const input = getInputFile('day6');

const packetDistictAt = (packet: string, uniqueNum: number) => {
  let firstMarker = 0;

  for (let i = 0; i < packet.length - uniqueNum; i++) {
    const section = packet.slice(i, i + uniqueNum);
    // section is completely unique
    if (new Set(section).size === section.length) {
      firstMarker = i + uniqueNum;
      break;
    }
  }

  return firstMarker;
};

const part1 = () => packetDistictAt(input, 4);
const part2 = () => packetDistictAt(input, 14);
logResults(part1, part2);
