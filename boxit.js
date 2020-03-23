#!/tmp/npm-6208-93895a5b/registry.npmjs.org/_40types/env node
    
let arr = process.argv.slice(2);
let tl = '┏';
let tr = '┓';
let bl = '┗';
let br = '┛';
let tm = '┳';
let ml = '┣';
let mm = '╋';
let mr = '┫';
let bm = '┻';
let m = '━';
let bar = '┃';
let sp = ' ';

const boxWord = (w, l,) => {
    if (Array.isArray(w)) {
        let word = '';
        for (let i = 0; i < l.length; i++) {
            if (w[i]) {word += `${bar}${w[i]}${sp.repeat(l[i]-w[i].length)}`}
            else {word += `${bar}${sp.repeat(l[i])}`}
        }
        word += `${bar}`
        return word;
    }
    else return `${bar}${w}${sp.repeat(l-w.length)}${bar}`;
}
const boxTop = (l) => {
    if (Array.isArray(l)) {
        let line = `${tl}`;
        for (let i = 0; i < l.length; i++) {
            if (i === l.length -1) {line += `${m.repeat(l[i])}${tr}`}
            else {line += `${m.repeat(l[i])}${tm}`}
        }
        return line;
    }
    else return `${tl}${m.repeat(l)}${tr}`
}
const boxMid = (l) => {
    if (Array.isArray(l)) {
        let line = `${ml}`;
        for (let i = 0; i < l.length; i++) {
            if (i === l.length -1) {line += `${m.repeat(l[i])}${mr}`}
            else {line += `${m.repeat(l[i])}${mm}`}
        }
        return line;
    }
    else return `${ml}${m.repeat(l)}${mr}`
}
const boxBotm = (l) => {
    if (Array.isArray(l)) {
        let line = `${bl}`
        for (let i = 0; i < l.length; i++) {
            if (i === l.length -1) {line += `${m.repeat(l[i])}${br}`}
            else {line += `${m.repeat(l[i])}${bm}`}
        }
        return line;
    }
    return `${bl}${m.repeat(l)}${br}`
}


const boxIt = (arr) => {
    if (!arr[0].endsWith(".csv")) {
        let l = 0;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].length > l) {l = arr[i].length}
        }
        if (arr.length === 1) {
            return `${boxTop(l)}\n${boxWord(arr[0],l)}\n${boxBotm(l)}`
        }
        else {
            let answer = `${boxTop(l)}\n`
            for (let i = 0; i < arr.length; i++) {
                if (i === arr.length - 1) {answer += `${boxWord(arr[i], l)}\n`}
                else answer += `${boxWord(arr[i],l)}\n${boxMid(l)}\n`
            }
            answer += `${boxBotm(l)}`
            return answer
        }
    }
    else {
        const fs = require('fs');

        fs.readFile('boxit.csv', function (err, fileData) {
            const str = fileData.toString()
            arr = str.split('\n')
            
            let l = [];
            for (let i = 0; i < arr.length; i++) {
                arr[i] = arr[i].split(',');
                for (let j = 0; j < arr[i].length; j++) {
                    if(!l[j]) {l.push(arr[i][j].length)}
                    else if (arr[i][j].length > l[j]) {l[j] = arr[i][j].length}
                }
            }

            let answer = `${boxTop(l)}\n`
            for (let i = 0; i < arr.length; i++) {
                if (i === arr.length - 1) {answer += `${boxWord(arr[i], l)}\n`}
                else {answer += `${boxWord(arr[i], l)}\n${boxMid(l)}\n`}
            }

            answer += `${boxBotm(l)}`
            console.log(answer);
            return answer
        });
    }
}


console.log(boxIt(arr));