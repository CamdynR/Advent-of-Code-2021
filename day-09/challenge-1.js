// challenge-1.js

const fs = require('fs');

// Initialize the program
init();

/**
 * Initializing function, the program begins here
 */
function init() {
  // Grab the input from the file
  const input = parseInput('input.txt', '\n');
  // Calculate the risk level from the lowest points
  const riskLevelSum = findLowPointsSum(input);
  console.log(`Answer: ${riskLevelSum}`);
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
 * Finds the lowest points in the 2D string array, adds 1 to them and
 * adds those sums to a "risk level" sum to be returned
 * @param {array<string>} input a 2D array of strings as input
 * @returns {number} the risk level sum - all the lowest points (+1) summed
 */
function findLowPointsSum(input) {
  let riskLevelSum = 0;
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      // Directions that are higher - North, East, South, West order
      let dirs = [true, true, true, true];
      // Check North
      if (i != 0) dirs[0] = input[i-1][j] > input[i][j];
      // Check East
      if (j != input[i].length - 1) dirs[1] = input[i][j+1] > input[i][j];
      // Check South
      if (i != input.length - 1) dirs[2] = input[i+1][j] > input[i][j];
      // Check West
      if (j != 0) dirs[3] = input[i][j-1] > input[i][j];
      // if they all check out, add to the sum
      if (dirs[0] && dirs[1] && dirs[2] && dirs[3]) {
        riskLevelSum += (Number(input[i][j]) + 1);
      }
    }
  }
  return riskLevelSum;
}