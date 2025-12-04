import fs from 'node:fs';

const rawData = fs.readFileSync('./data/day-4/input.txt', { 'encoding': 'ascii' });
const matrix = rawData.split('\n').map((cur) => cur.split(''));

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

function isValid(matrix: string[][], i: number, j: number) {
    return i >= 0 && j >= 0 && i < matrix.length && j < matrix[0]!.length;
}

function countWraps(matrix: string[][], i: number, j: number) {
    let cnt = 0;
    for (let index = 0; index < POSITIONS.length; index++) {
        const x = POSITIONS[index]![0] + i;
        const y = POSITIONS[index]![1] + j;

        if (isValid(matrix, x, y) && matrix[x]![y] !== '.') {
            cnt++;
        }
    }
    if (cnt < 4) {
        matrix[i]![j] = 'x';
    }
    return cnt;
}

function prune(matrix: string[][]) {
    const n = matrix.length;
    const m = matrix[0]!.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            matrix[i]![j] = matrix[i]![j] === 'x' ? '.' : matrix[i]![j]!;
        }
    }
}

let ans = 0;
let flag = true;

while (flag) {
    flag = false;
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i]!.length; j++) {
            if (matrix[i]![j] === '@' && countWraps(matrix, i, j) < 4) {
                flag = true;
                ans++;
            }
        }
    }
    prune(matrix);
}

console.log(ans);