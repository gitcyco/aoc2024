import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const lines = input.split("\n");
  const colA = [];
  const colB = [];
  for (let line of lines) {
    let [a, b] = line.split(/\s+/);
    colA.push(+a);
    colB.push(+b);
  }
  colA.sort((a, b) => a - b);
  colB.sort((a, b) => a - b);
  let total = 0;
  for (let i = 0; i < colA.length; i++) {
    total += Math.abs(colA[i] - colB[i]);
  }
  return total;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const lines = input.split("\n");
  const colA = [];
  const countsB = {};
  for (let line of lines) {
    let [a, b] = line.split(/\s+/);
    colA.push(+a);
    if (b in countsB) countsB[b]++;
    else countsB[b] = 1;
  }
  let total = 0;
  for (let num of colA) {
    if (num in countsB) total += num * countsB[num];
  }
  return total;
};

run({
  part1: {
    tests: [
      {
        input: `
        3   4
        4   3
        2   5
        1   3
        3   9
        3   3`,
        expected: 11,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        3   4
        4   3
        2   5
        1   3
        3   9
        3   3`,
        expected: 31,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
