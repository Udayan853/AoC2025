import fs from 'node:fs';

const rawData = fs.readFileSync('./data/day-7/input.txt', 'ascii');
const rows = rawData.split('\n');

let laserCols = new Set<number>();
laserCols.add(rows[0]!.indexOf('S'));
let ans = 0;

rows.forEach((curRow) => {
    const indices = new Set<number>();
    curRow.matchAll(/\^/g).forEach((e) => indices.add(e.index));
    const obstructions = laserCols.intersection(indices);
    if (obstructions.size > 0) {
        laserCols = laserCols.difference(obstructions);
        obstructions.forEach((obs) => {
            if (obs - 1 >= 0) laserCols.add(obs - 1);
            if (obs + 1 < curRow.length) laserCols.add(obs + 1);
            ans++;
        });
    }
});

console.log(ans);