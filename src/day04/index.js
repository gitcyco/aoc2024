import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const dirs = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
  [-1, -1],
  [-1, 1],
  [1, 1],
  [1, -1],
];

const xDirs = {
  ul: { x: -1, y: -1 },
  ll: { x: -1, y: 1 },
  ur: { x: 1, y: -1 },
  lr: { x: 1, y: 1 },
};

const getCorner = (x, y, key) => {
  return key in xDirs ? [x + xDirs[key].x, y + xDirs[key].y] : [-1, -1];
};

const checkCorners = (x1, y1, x2, y2, matrix) =>
  (matrix[y1][x1] === "M" && matrix[y2][x2] === "S") ||
  (matrix[y1][x1] === "S" && matrix[y2][x2] === "M");

const checkMas = (x, y, matrix) => {
  const [ulX, ulY] = getCorner(x, y, "ul");
  const [llX, llY] = getCorner(x, y, "ll");
  const [urX, urY] = getCorner(x, y, "ur");
  const [lrX, lrY] = getCorner(x, y, "lr");

  const xLen = matrix[0].length;
  const yLen = matrix.length;

  if (!bounds(ulX, ulY, xLen, yLen)) return false;
  if (!bounds(llX, llY, xLen, yLen)) return false;
  if (!bounds(urX, urY, xLen, yLen)) return false;
  if (!bounds(lrX, lrY, xLen, yLen)) return false;

  return (
    // Upper left / lower right
    checkCorners(ulX, ulY, lrX, lrY, matrix) &&
    // Upper right / lower left
    checkCorners(urX, urY, llX, llY, matrix)
  );
};

const bounds = (x, y, xDim, yDim) => {
  return !(x < 0 || y < 0 || x > xDim - 1 || y > yDim - 1);
};

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const matrix = input.split("\n").map((e) => e.split(""));
  const xLen = matrix[0].length;
  const yLen = matrix.length;
  const key = "XMAS";
  let count = 0;

  for (let x = 0; x < xLen; x++) {
    for (let y = 0; y < yLen; y++) {
      if (matrix[y][x] === "X") {
        for (let [xDir, yDir] of dirs) {
          let [newX, newY] = [x, y];
          let word = "";
          for (
            let i = 0;
            i < key.length && bounds(newX, newY, xLen, yLen);
            i++
          ) {
            if (matrix[newY][newX] === key[i]) {
              word += matrix[newY][newX];
            } else {
              break;
            }
            [newX, newY] = [newX + xDir, newY + yDir];
          }
          if (word === key) count++;
        }
      }
    }
  }
  return count;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const matrix = input.split("\n").map((e) => e.split(""));
  const xLen = matrix[0].length;
  const yLen = matrix.length;
  let count = 0;
  for (let x = 0; x < xLen; x++) {
    for (let y = 0; y < yLen; y++) {
      if (matrix[y][x] === "A" && checkMas(x, y, matrix)) count++;
    }
  }
  return count;
};

run({
  part1: {
    tests: [
      {
        input: `
        MMMSXXMASM
        MSAMXMSMSA
        AMXSXMAAMM
        MSAMASMSMX
        XMASAMXAMM
        XXAMMXXAMA
        SMSMSASXSS
        SAXAMASAAA
        MAMMMXMMMM
        MXMXAXMASX`,
        expected: 18,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        .M.S......
        ..A..MSMS.
        .M.S.MAA..
        ..A.ASMSM.
        .M.S.M....
        ..........
        S.S.S.S.S.
        .A.A.A.A..
        M.M.M.M.M.
        ..........`,
        expected: 9,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
