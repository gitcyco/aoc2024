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
  return [x + xDirs[key].x, y + xDirs[key].y];
};

const checkMas = (x, y, matrix) => {
  // const [ulX, ulY] = [x + xDirs.ul.x, y + xDirs.ul.y];
  // const [llX, llY] = [x + xDirs.ll.x, y + xDirs.ll.y];
  // const [urX, urY] = [x + xDirs.ur.x, y + xDirs.ur.y];
  // const [lrX, lrY] = [x + xDirs.lr.x, y + xDirs.lr.y];

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
    ((matrix[ulY][ulX] === "M" && matrix[lrY][lrX] === "S") ||
      (matrix[ulY][ulX] === "S" && matrix[lrY][lrX] === "M")) &&
    ((matrix[urY][urX] === "M" && matrix[llY][llX] === "S") ||
      (matrix[urY][urX] === "S" && matrix[llY][llX] === "M"))
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
