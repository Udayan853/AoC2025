import fs from 'node:fs';

const rawData = fs.readFileSync('./data/day-6/input.txt', 'ascii');

function processCol(curCol: string[]) {
    const rows = curCol.length - 1;
    const cols = curCol[0]!.length;

    let ans = curCol.at(-1) === '+' ? 0 : 1;
    for (let i = cols - 1; i >= 0; i--) {
        let curNum = 0;
        for (let j = 0; j < rows; j++) {
            const element = curCol[j]![i]!;
            if (element !== ' ') {
                curNum = 10 * curNum + Number(element);
            }
        }
        ans = curCol.at(-1) === '+' ? ans + curNum : ans * curNum;
    }
    return ans;
}

const matrix = rawData.split('\n');
const processedMatrix: string[][] = [];
const symbols = matrix.at(-1)!;

let problem: string[] = [];
let lastSymbol = 0;

for (let i = 0; i < symbols.length; i++) {
    if (i === 0) continue;
    const element = symbols[i]!;
    if (element === '*' || element === '+' || i === (symbols.length - 1)) {
        for (let j = 0; j < matrix.length - 1; j++) {
            if (i === symbols.length - 1) {
                problem.push(matrix[j]!.substring(lastSymbol));
                continue;
            }
            problem.push(matrix[j]!.substring(lastSymbol, i - 1));
        }
        processedMatrix.push([...problem, symbols.at(lastSymbol)!]);
        problem = [];
        lastSymbol = i;
    }
}

let ans = 0;
processedMatrix.forEach((e) => {
    const tmp = processCol(e)
    ans += tmp;
});

console.log(ans);