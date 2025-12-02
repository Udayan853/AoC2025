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

        for (let j = 1; j < n; j++) {
            const match = cur.substring(0, j);
            const re = new RegExp(`^(${match})*$`)
            if (re.test(cur)) {
                console.log('matched', cur, 'with', re);
                ans += i;
                break;
            }
        }
    }
});

console.log(ans);