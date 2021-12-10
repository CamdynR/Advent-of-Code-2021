// challenge-1.js

const fs = require('fs');

// Easy lookup table objects - pairs
const pairs = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>'
};
// Easy lookup table objects - points for closing character
const points = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137
};
// An array of all of the open symbols (e.g. (, [ ...) for easy reference
const openSymbols = Object.keys(pairs);

// Initialize the program
init();

/**
 * Initializing function, the program begins here
 */
function init() {
  const input = parseInput('input.txt', '\n');
  console.log(`Answer: ${sumIllegalChars(input)}`);
}

/**
 * Grabs the inputs from input.txt, then parses them and returns the
 * outputs only
 * @param {string} filename The filename of the input to parse
 * @param {string} splitChar The character(s) to split the lines by
 * @returns {array} An array of outputs only
 */
 function parseInput(fileName, splitChar) {
  // Reads in the file as a string, splits along splitChar for each line
  return fs.readFileSync(fileName, 'utf-8').split(splitChar);
}

/**
 * Checks an array of strings for illegal characters (premature closing symbols)
 * and sums up their value
 * @param {array<string>} input an array of rows to check for illegal characters
 * @returns {number} the sum of the worth of the illegal chars
 */
function sumIllegalChars(input) {
  let sum = 0;
  input.forEach(line => {
    // Keep all of the open chars in a queue for easy reference
    const openQueue = [];
    for (let i = 0; i < line.length; i++) {
      let currChar = line[i];
      // Check if the current char is an opening symbol; if so add to queue
      if (openSymbols.includes(currChar)) {
        openQueue.push(currChar);
      // Else it must be a closing symbol
      } else {
        // Pop the most recent (last) opening character off the queue and
        // look it up in the pairs table to see if it matches the current
        // closing character
        let charToCheck = pairs[openQueue.pop()];
        // if it fails, look up its point value and add it to sum
        if (currChar != charToCheck) {
          sum += points[currChar];
          // return to skip the rest of this row
          return;
        }
      }
    }
  });
  return sum;
}