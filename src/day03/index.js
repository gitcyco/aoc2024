import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  let ins = input.match(/mul\(\d{1,3},\d{1,3}\)/g);
  let total = 0;
  for (let mul of ins) {
    total += mul.match(/\d+/g).reduce((a, e) => a * e);
  }
  return total;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  let ins = input.match(/mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)/g);
  let total = 0;
  let calc = true;
  for (let mul of ins) {
    if (mul === "do()") calc = true;
    else if (mul === "don't()") calc = false;
    else if (calc) {
      total += mul.match(/\d+/g).reduce((a, e) => a * e);
    }
  }
  return total;
};

run({
  part1: {
    tests: [
      {
        input: `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`,
        expected: 161,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`,
        expected: 48,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
