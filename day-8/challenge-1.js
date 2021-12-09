// challenge-1.js

const fs = require('fs');
// All of the number of segments that are unique
const uniqueLengths = [2, 3, 4, 7];

// Initialize the program
init();

/**
 * Initializing function, the program begins here
 */
function init() {
  // Grab the input from the text file
  const input = parseInput('input.txt', '\n');
  // Count how many unique numbers there are in the outputs
  console.log(`Answer: ${countUniqueNums(input)}`);
}

/**
 * Grabs the inputs from input.txt, then parses them and returns the
 * outputs only
 * @param {string} filename The filename of the input to parse
 * @param {string} splitChar The character(s) to split the lines by
 * @returns {array} An array of outputs only
 */
function parseInput(filename, splitChar) {
  // Reads in the file as a string, splits along splitChar for each line
  let input = fs.readFileSync(filename, 'utf-8').split(splitChar);
  // Splits each line along | and takes only the right half, then splits by space
  return input.map(str => str.split(' | ')[1]).map(str => str.split(' '));
}

/**
 * 
 * @param {array} input 
 * @returns {number} Number of unique
 */
function countUniqueNums(input) {
  let numUnique = 0;
  input.forEach(arr => {
    arr.forEach(str => {
      if (uniqueLengths.includes(str.length)) {
        numUnique += 1;
      }
    });
  });
  return numUnique;
}