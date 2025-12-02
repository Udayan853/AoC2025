import fs from 'node:fs';

const fileData = fs.readFileSync('./data/day-2/input.txt', { encoding: 'ascii' }).trim().split(',');
const parsedFileData = fileData.map((val) => {
    return val.split('-').map((val) => Number.parseInt(val));
})

let ans = 0;
parsedFileData.forEach((range) => {
    const lb = range[0]!;
    const ub = range[1]!;
    for (let i = lb; i <= ub; i++) {
        const cur = String(i);
        const n = cur.length;

        if (n % 2 == 0) {
            const part1 = cur.substring(0, n / 2);
            const part2 = cur.substring(n / 2, n);
            ans += part1 === part2 ? i : 0;
        }
    }
});

console.log(ans);