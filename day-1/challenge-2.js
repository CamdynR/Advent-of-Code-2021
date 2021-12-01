// challenge-2.js

const fs = require('fs');

// Read in the input text, then split it by return character
let input = fs.readFileSync('input.txt', 'utf-8').split('\n');
// Make sure that the array is all of type number
input = input.map(str => Number(str));

// For Testing:
// const input = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];

// Reducer to add the sliding window up easily
const reducer = (prev, curr) => prev + curr;
// Start the window with the first three indexes
const window = [input[0], input[1], input[2]];
// Holding variables for previous sliding window num & the increasing num count
let prev = window.reduce(reducer);
let numIncreasing = 0;
for (let i = 3; i < input.length; i++) {
  // Remove the first index of our window
  window.shift();
  // Add the new number to the end of the window
  window.push(input[i]);
  // Get the current sum of our new window
  const curr = window.reduce(reducer)
  // Add to our count if it's larger than the previous sum
  if (curr > prev) {
    numIncreasing += 1;
    console.log(`prev: ${prev}, curr: ${curr}, diff: ${curr - prev}`);
  }
  // Store our current sum as previous now that we're done with it
  prev = curr;
}

// Log the final count
console.log(`\nFinal Count: ${numIncreasing}`);