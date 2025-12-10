import fs from 'node:fs';

const rawData = fs.readFileSync('./data/day-7/input.txt', 'ascii');
const processedData = rawData.split('\n').map((cur) => cur.split(''));

interface Entry {
    x: number,
    y: number,
    c: number
}

const trows = processedData.length;
const starty = processedData[0]!.indexOf('S');
const startx = 0;

let current: Entry[] = [{ x: startx, y: starty, c: 1 }];
let ans = 0;

while (current.length > 0) {
    const next = new Map<string, number>();

    current.forEach(({ x, y, c }) => {
        if (x + 1 >= trows) {
            ans += c;
            return;
        }
        if (processedData[x]![y] === '^') {
            const left = (x + 1) + ',' + (y - 1);
            const right = (x + 1) + ',' + (y + 1);

            next.set(left, (next.get(left) ?? 0) + c);
            next.set(right, (next.get(right) ?? 0) + c);
        }
        else {
            const same = (x + 1) + ',' + y;
            next.set(same, (next.get(same) ?? 0) + c);
        }
    });

    const nextArray: Entry[] = []
    next.forEach((value, key) => {
        const tmp = key.split(',').map((e) => Number(e));
        nextArray.push({ x: tmp[0]!, y: tmp[1]!, c: value })
    })

    current = nextArray;
}

console.log(ans);