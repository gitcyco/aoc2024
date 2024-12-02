import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const lines = input.split("\n").map((e) => e.split(" ").map(Number));
  let count = 0;
  for (let line of lines) {
    if (checkLine(line)) count++;
  }
  return count;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const lines = input.split("\n").map((e) => e.split(" ").map(Number));
  let count = 0;
  for (let line of lines) {
    if (checkLine(line)) {
      count++;
    } else {
      let good = false;
      for (let j = 0; j < line.length; j++) {
        let newLine = line.toSpliced(j, 1);
        for (let i = 1; i < newLine.length; i++) {
          if (checkLine(newLine)) good = true;
        }
      }
      if (good) count++;
    }
  }
  return count;
};

const checkLine = (line) => {
  let slope = line[0] - line[line.length - 1];
  let inc = slope < 0;
  let good = true;
  for (let i = 1; i < line.length; i++) {
    let [a, b] = [line[i - 1], line[i]];
    good = good && check(a, b, inc);
  }
  return good;
};

const check = (a, b, inc) => {
  let dif = Math.abs(a - b);
  if (dif < 1 || dif > 3) return false;
  if (inc && a >= b) return false;
  else if (!inc && a <= b) return false;
  return true;
};

run({
  part1: {
    tests: [
      {
        input: `
        7 6 4 2 1
        1 2 7 8 9
        9 7 6 2 1
        1 3 2 4 5
        8 6 4 4 1
        1 3 6 7 9`,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        7 6 4 2 1
        1 2 7 8 9
        9 7 6 2 1
        1 3 2 4 5
        8 6 4 4 1
        1 3 6 7 9`,
        expected: 4,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
