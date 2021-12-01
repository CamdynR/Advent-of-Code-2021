// challenge-2.js

const fs = require('fs');

let input = fs.readFileSync('input.txt', 'utf-8').split('\n');
input = input.map(str => Number(str));

// For Testing:
// const input = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];

const reducer = (prev, curr) => prev + curr;
const window = [input[0], input[1], input[2]];
let prev = window.reduce(reducer);
let numIncreasing = 0;
for (let i = 3; i < input.length; i++) {
  window.shift();
  window.push(input[i]);
  const curr = window.reduce(reducer)
  if (curr > prev) {
    numIncreasing += 1;
    console.log(`prev: ${prev}, curr: ${curr}, diff: ${curr - prev}`);
  }
  prev = curr;
}

console.log(`\nFinal Count: ${numIncreasing}`);