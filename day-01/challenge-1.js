// challenge-1.js

const fs = require('fs');

// Read in the input text, then split it by return character
let input = fs.readFileSync('input.txt', 'utf-8').split('\n');
// Make sure that the array is all of type number
input = input.map(str => Number(str));

// For Testing:
// const input = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];

// Holding variables for previous number & the increasing number count
let prev = input[0];
let numIncreasing = 0;
for (let i = 1; i < input.length; i++) {
  // If the current one's larger, update the increasing count
  if (input[i] > prev) {
    numIncreasing += 1;
    console.log(`prev: ${prev}, curr: ${input[i]}, diff: ${input[i] - prev}`);
  }
  // Now that we're finished with the current number, store it in the prev
  prev = input[i];
}

// Log the final count
console.log(`\nFinal Count: ${numIncreasing}`);