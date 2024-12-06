import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const lines = input.split("\n");
  const { order, pages } = makeOrderPages(lines);

  const rules = makeRules(order);

  let [good, _] = checkEm(pages, rules);
  console.log("TOTAL GOOD:", good);
  return good;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const lines = input.split("\n");
  const { order, pages } = makeOrderPages(lines);

  const rules = makeRules(order);
  let [_, bad] = checkEm(pages, rules);

  console.log("TOTAL BAD:", bad);
  return bad;
};

const makeRules = (order) => {
  const rules = {};
  order.forEach((rule) => {
    const [a, b] = rule.split("|");
    if (a in rules) rules[a].push(b);
    else rules[a] = [b];
  });
  return rules;
};

const makeOrderPages = (lines) => {
  const order = [];
  const pages = [];
  lines.forEach((line) => {
    if (line.includes("|")) order.push(line);
    else if (line) pages.push(line);
  });
  return { order, pages };
};

const checkEm = (pages, rules) => {
  let totalGood = 0;
  let totalBad = 0;
  for (let page of pages) {
    let list = page.split(",");
    const sorted = [...list].sort((a, b) => {
      if (a in rules && rules[a].includes(b)) return -1;
      return 0;
    });
    if (list.join() === sorted.join()) {
      totalGood += +list[Math.floor(list.length / 2)];
    } else {
      totalBad += +sorted[Math.floor(list.length / 2)];
    }
  }
  return [totalGood, totalBad];
};

run({
  part1: {
    tests: [
      {
        input: `
        47|53
        97|13
        97|61
        97|47
        75|29
        61|13
        75|53
        29|13
        97|29
        53|29
        61|53
        97|53
        61|29
        47|13
        75|47
        97|75
        47|61
        75|61
        47|29
        75|13
        53|13

        75,47,61,53,29
        97,61,53,29,13
        75,29,13
        75,97,47,61,53
        61,13,29
        97,13,75,29,47`,
        expected: 143,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        47|53
        97|13
        97|61
        97|47
        75|29
        61|13
        75|53
        29|13
        97|29
        53|29
        61|53
        97|53
        61|29
        47|13
        75|47
        97|75
        47|61
        75|61
        47|29
        75|13
        53|13

        75,47,61,53,29
        97,61,53,29,13
        75,29,13
        75,97,47,61,53
        61,13,29
        97,13,75,29,47`,
        expected: 123,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
