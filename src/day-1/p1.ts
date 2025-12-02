import fs from 'node:fs';

const file = fs.readFileSync('./data/day-1/input.txt', { encoding: 'ascii' });
const inputArr = file.trim().split('\n')

let ans = 0, cur = 50;

inputArr.forEach((instruction) => {
    const shiftAbs = Number.parseInt(instruction.slice(1, instruction.length));
    const shifts = instruction.at(0) === 'L' ? -shiftAbs : shiftAbs;
    const newPos = cur + shifts;

    cur = (newPos + 1000) % 100;
    ans += cur === 0 ? 1 : 0;
})

console.log(ans);