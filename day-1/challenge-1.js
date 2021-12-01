// challenge-1.js

const fs = require('fs');

let input = fs.readFileSync('input.txt', 'utf-8').split('\n');
input = input.map(str => Number(str));

// For Testing:
// const input = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];

let prev = input[0];
let numIncreasing = 0;
for (let i = 1; i < input.length; i++) {
  if (input[i] > prev) {
    numIncreasing += 1;
    console.log(`prev: ${prev}, curr: ${input[i]}, diff: ${input[i] - prev}`);
  }
  prev = input[i];
}

console.log(`\nFinal Count: ${numIncreasing}`);