// challenge-1.js

const fs = require('fs');

// Read in the input text, then split it by return character
let input = fs.readFileSync('input.txt', 'utf-8').split('\n');

// For simple testing
let testInput = ['00100', '11110', '10110', '10111', '10101', '01111', '00111', '11100', '10000', '11001', '00010', '01010'];

// Create the empty arrays where we'll store the counts
let values = [[], []];
for (let i = 0; i < input[0].length; i++) {
  values[0].push(0);
  values[1].push(0);
}

// Stays 0 if 0 is most common, 1 if 1 is most common
input.forEach(gamma => {
  for (let i = 0; i < gamma.length; i++) {
    const currVal = gamma.charAt(i);
    values[Number(currVal)][i] += 1;
  }
});

// Add the values to the respective rates
let gammaRate = '';
let epsilonRate = '';
for (let i = 0; i < values[0].length; i++) {
  if (values[0][i] > values[1][i]) {
    gammaRate += 0;
    epsilonRate += 1;
  } else {
    gammaRate += 1;
    epsilonRate += 0;
  }
}

console.log(`Gamma Rate - Binary: ${gammaRate}, Decimal: ${parseInt(gammaRate, 2)}`);
console.log(`Epsilon Rate ${epsilonRate}, Decimal: ${parseInt(epsilonRate, 2)}`);
console.log(`Final Answer (Decimal): ${parseInt(gammaRate, 2) * parseInt(epsilonRate, 2)}`);