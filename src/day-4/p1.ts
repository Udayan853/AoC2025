import fs from 'node:fs';

const rawData = fs.readFileSync('./data/day-4/input.txt', { 'encoding': 'ascii' });
const matrix = rawData.split('\n');

const POSITIONS = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1]
] as const

function isValid(matrix: string[], i: number, j: number) {
    return i >= 0 && j >= 0 && i < matrix.length && j < matrix[0]!.length;
}

function countWraps(matrix: string[], i: number, j: number) {
    let cnt = 0;
    for (let index = 0; index < POSITIONS.length; index++) {
        const x = POSITIONS[index]![0] + i;
        const y = POSITIONS[index]![1] + j;

        if (isValid(matrix, x, y) && matrix[x]![y] === '@') {
            cnt++;
        }
    }
    return cnt;
}

let ans = 0

for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i]!.length; j++) {
        if (matrix[i]![j] === '@' && countWraps(matrix, i, j) < 4) {
            ans++;
        }
    }
}

console.log(ans);