import fs from 'node:fs';

const rawData = fs.readFileSync('./data/day-6/input.txt', 'ascii');

const parsedData = rawData.split('\n').map((line) => {
    return line.trim().split(/[ ]+/);
});

let ans = 0;
for (let col = 0; col < parsedData[0]!.length; col++) {
    const operation = parsedData[parsedData.length - 1]![col]!;
    let cursoln = operation === '*' ? 1 : 0;
    for (let row = 0; row < parsedData.length - 1; row++) {
        switch (operation) {
            case '*':
                cursoln *= Number(parsedData[row]![col]!);
                break;
            case '+':
                cursoln += Number(parsedData[row]![col]!);
                break;
        }
    }
    ans += cursoln;
}

console.log(ans);