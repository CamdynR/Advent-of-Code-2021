// challenge-2.js

const fs = require('fs');

// Read in the input text, then split it by the comma character
let input = fs.readFileSync('input.txt', 'utf-8').split(',');
input = input.map(str => Number(str));

// Calculate the mean (average) of all of the numbers
let mean = Math.floor(input.reduce((a,b) => a + b) / input.length);
// Variable to store the new fuel sum
let fuelSum = 0;
input.forEach(num => {
  // Calculate the difference between the mean and the current number
  let n = Math.abs(num - mean);
  // Formula to get the corresponding sum for that difference
  fuelSum += Math.floor(((n*n) + n) / 2);
});
// Log that answer
console.log(`Answer: ${fuelSum}`);