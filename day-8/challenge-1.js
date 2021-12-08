// challenge-1.js

const fs = require('fs');

const uniqueLengths = [2,3,4,7];

// Read in the input text, then split it by the comma character
let input = fs.readFileSync('input.txt', 'utf-8').split('\n');
input = input.map(str => str.split('|')[1]).map(str => str.split(' '));
input = input.filter(arr => arr.splice(0,1));
let numUnique = 0;
input.forEach(arr => {
  arr.forEach(str => {
    if (uniqueLengths.includes(str.length)) {
      numUnique += 1;
    }
  });
});

console.log(`Answer: ${numUnique}`);