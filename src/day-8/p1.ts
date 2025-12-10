import fs from "node:fs"

const rawData = fs.readFileSync('./data/day-8/input.txt', 'ascii');

interface Position {
    x: number,
    y: number,
    z: number
}

interface Relation {
    p1: Position,
    p2: Position,
    distance: number
}

function calcDistance(p1: Position, p2: Position) {
    const x = (p1.x - p2.x);
    const y = (p1.y - p2.y);
    const z = (p1.z - p2.z);
    return (x * x) + (y * y) + (z * z)
}

function toString(p: Position) {
    return p.x + ',' + p.y + ',' + p.z;
}

function findRoot(p: string, parent: Map<string, string>): string {
    if (parent.get(p) === p) return p;
    const root = findRoot(parent.get(p)!, parent);
    parent.set(p, root);
    return root;
}

function union(p1: string, p2: string, size: Map<string, number>, parent: Map<string, string>) {
    let r1 = findRoot(p1, parent);
    let r2 = findRoot(p2, parent);

    if (r1 !== r2) {
        const sz1 = size.get(r1)!;
        const sz2 = size.get(r2)!;
        if (sz1 <= sz2) {
            const tmp = r1;
            r1 = r2;
            r2 = tmp;
        }
        parent.set(r1, r2);
        size.set(r2, sz1 + sz2);
    }
}

const parent = new Map<string, string>();
const size = new Map<string, number>();

const processedData: Position[] = rawData.split('\n')
    .map((record) => {
        const cur = record.split(',').map((e) => Number(e));
        return { x: cur[0]!, y: cur[1]!, z: cur[2]! };
    });

const relations: Relation[] = [];

processedData.forEach((pos) => {
    const stringPos = toString(pos);
    parent.set(stringPos, stringPos);
    size.set(stringPos, 1);
});

for (let i = 0; i < processedData.length; i++) {
    for (let j = i + 1; j < processedData.length; j++) {
        const element1 = processedData[i]!;
        const element2 = processedData[j]!;
        relations.push({ p1: element1, p2: element2, distance: calcDistance(element1, element2) });
    }
}

relations.sort((r1, r2) => r1.distance - r2.distance);

relations.slice(0, 1000).forEach(({ p1, p2 }) => {
    const strP1 = toString(p1);
    const strP2 = toString(p2);
    union(strP1, strP2, size, parent);
});

const circuitMap = new Map<string, number>();

processedData.forEach((pos) => {
    const strPos = toString(pos);
    const root = findRoot(strPos, parent);
    circuitMap.set(root, size.get(root)!);
})

const soln = Array.from(circuitMap.entries());
const ans = soln.sort((a, b) => b[1] - a[1]).slice(0, 3).reduce((acc, cur) => acc * cur[1], 1);
console.log(ans);