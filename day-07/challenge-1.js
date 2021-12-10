// challenge-1.js

const fs = require('fs');

// Read in the input text, then split it by the comma character
let input = fs.readFileSync('input.txt', 'utf-8').split(',');
input = input.map(str => Number(str));

// Sort them in order so I can grab the median (middle number)
input = input.sort((a,b) => a - b);
// Grab the median
let median = input[Math.floor(input.length/2)];
// Sum the difference between each value and the median
let fuelSum = 0;
input.forEach(num => {
  fuelSum += Math.abs(num - median);
});
// Log the answer
console.log(`Answer: ${fuelSum}`);