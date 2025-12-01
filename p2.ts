import fs from 'node:fs';

const file = fs.readFileSync('./data/input.txt', { encoding: 'ascii' });
const inputArr = file.trim().split('\n')

let ans = 0, cur = 50;

inputArr.forEach((instruction) => {
    const shiftAbs = Number.parseInt(instruction.slice(1, instruction.length));
    const shifts = instruction.at(0) === 'L' ? -shiftAbs : shiftAbs;
    const newPos = cur + shifts;

    if (newPos === 0 || newPos < 0 && cur > 0) ans++;
    ans += Math.floor(Math.abs(newPos) / 100);
    cur = (newPos + 1000) % 100;
})

console.log(ans);