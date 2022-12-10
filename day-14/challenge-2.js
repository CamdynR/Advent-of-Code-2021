const fs = require('fs');
let input = fs.readFileSync(`${__dirname}/input-real.txt`).toString();

const NUM_LOOPS = 10;

// class LongString {
//   #chunkLength = 10000000;
//   #str = [];
//   constructor(str) {
//     if (str.length > this.#chunkLength) {
//       for (let i = 0; i < Math.floor(str.length / this.#chunkLength); i++) {
//         this.#str.push(str.substring(this.#chunkLength * i, this.#chunkLength));
//       }
//     } else {
//       this.#str.push(str);
//     }
//   }
//   append() {}
// }

// Global variables for later
let template, instructionMap, builtStr;

// Format the input, grab the template
input = input.split('\n');
template = input.shift();
input.shift();
input = input.map((i) => i.split(' -> '));

// Create the instruction map
instructionMap = {};
for (let i = 0; i < input.length; i++) {
  instructionMap[input[i][0]] = input[i][1];
}

// Loop through the input using a window of size two
for (let i = 0; i < NUM_LOOPS; i++) {
  builtStr = template.charAt(0);
  for (let j = 1; j < template.length; j++) {
    let window = template.substring(j - 1, j + 1);
    if (instructionMap[window] === undefined) {
      builtStr += window.charAt(1);
    } else {
      builtStr += instructionMap[window] + window.charAt(1);
    }
  }
  template = builtStr;
}

// Count the letters
let letterCount = {};
for (let i = 0; i < template.length; i++) {
  let c = template.charAt(i);
  if (letterCount[c] === undefined) letterCount[c] = 0;
  letterCount[c] += 1;
}

// Find the max and min letters
let max, min;
for (let c in letterCount) {
  if (max === undefined) max = letterCount[c];
  if (min === undefined) min = letterCount[c];
  if (letterCount[c] > max) max = letterCount[c];
  if (letterCount[c] < min) min = letterCount[c];
}

console.log(`Difference: ${max - min}`);
