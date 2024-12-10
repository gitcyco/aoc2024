import run from "aocrunner";

const parseInput = (rawInput) => {
  const grid = rawInput.split("\n").map((line) => line.split(""));
  return grid;
};

const dirs = {
  "^": [0, -1],
  ">": [1, 0],
  v: [0, 1],
  "<": [-1, 0],
};

const part1 = (rawInput) => {
  const grid = parseInput(rawInput);
  // console.log(grid);

  let [curX, curY] = getStart(grid);
  let curDir = grid[curY][curX];
  // console.log("CUR DIR:", curDir, curX, curY);
  let total = 0;
  let breaker = 0;
  const dirNext = ["^", ">", "v", "<"];
  let curDirIndex = dirNext.indexOf(curDir);

  while (breaker < 100000 && inBounds(curX, curY, grid)) {
    if (grid[curY][curX] !== "X") {
      total++;
      grid[curY][curX] = "X";
    }
    const [xDir, yDir] = dirs[curDir];
    const [nextX, nextY] = [curX + xDir, curY + yDir];
    if (!inBounds(nextX, nextY, grid)) {
      console.table(grid);
      return total;
    }
    if (grid[nextY][nextX] === "#") {
      curDirIndex = (curDirIndex + 1) % 4;
      curDir = dirNext[curDirIndex];
    } else {
      [curX, curY] = [nextX, nextY];
    }

    breaker++;
  }

  return total;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  return;
};

const getStart = (grid) => {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] in dirs) {
        return [x, y];
      }
    }
  }
  throw new Error("Starting point not found!");
};

const inBounds = (x, y, grid) => {
  let xLen = grid[0].length - 1;
  let yLen = grid.length - 1;
  if (x < 0 || x > xLen || y < 0 || y > yLen) return false;
  return true;
};

run({
  part1: {
    tests: [
      {
        input: `
        ....#.....
        .........#
        ..........
        ..#.......
        .......#..
        ..........
        .#..^.....
        ........#.
        #.........
        ......#...`,
        expected: 41,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
