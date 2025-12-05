import fs from 'node:fs'

type Range = [number, number];

function isOverlapping(r1: Range, r2: Range) {
    return r1[0] <= r2[0] && r2[0] <= r1[1];
}

function elementInRange(r: Range, e: number) {
    return r[0] <= e && e <= r[1];
}

const rawData = fs.readFileSync('./data/day-5/input.txt', 'ascii').split('\n');
const overlappingRanges: Range[] = [];
const ranges: Range[] = [];
const input: number[] = [];

rawData.forEach((data) => {
    const curElement = data.split('-');
    if (curElement.length === 2) {
        const a = Number(curElement[0]);
        const b = Number(curElement[1]);
        overlappingRanges.push([a, b]);
    }
    else if (curElement.length === 1 && curElement[0] !== '') {
        const a = Number(curElement[0]);
        input.push(a);
    }
});

overlappingRanges.sort((a, b) => {
    if (a[0] === b[0]) return b[1] - a[1];
    return a[0] - b[0];
});

overlappingRanges.forEach((curRange) => {
    if (ranges.length === 0) ranges.push(curRange);
    const targetRange = ranges.at(-1)!;
    if (isOverlapping(targetRange, curRange)) {
        ranges.pop();
        ranges.push([targetRange[0], Math.max(curRange[1], targetRange[1])]);
    }
    else {
        ranges.push(curRange);
    }
});

let ans = 0;
input.forEach((element) => {
    for (let i = 0; i < ranges.length; i++) {
        const curRange = ranges[i]!;
        if (elementInRange(curRange, element)) {
            ans++;
            break;
        }
    }
})


console.log(ans);