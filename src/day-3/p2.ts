import fs from 'node:fs';

function findMax(bank: string, l: number, h: number) {
    let maxVal = 0, maxIndx = -1;
    for (let i = l; i <= h; i++) {
        const cur = Number.parseInt(bank.charAt(i));
        if (cur > maxVal) {
            maxVal = cur;
            maxIndx = i;
        }
    }
    return { maxVal: String(maxVal), maxIndx };
}

const rawData = fs.readFileSync('./data/day-3/input.txt', { encoding: 'ascii' });
const parsedData = rawData.trim().split('\n');

let ans = 0;
parsedData.forEach(bank => {
    const n = bank.length;

    const intermediate = { val: "", maxIndx: -1 };
    for (let i = 12; i > 0; i--) {
        const curMax = findMax(bank, intermediate.maxIndx + 1, n - i);
        intermediate.val += curMax.maxVal;
        intermediate.maxIndx = curMax.maxIndx;
    }
    ans += Number.parseInt(intermediate.val);
});

console.log(ans);