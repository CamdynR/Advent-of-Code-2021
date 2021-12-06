// challenge-2.js

const fs = require('fs');
const Board = require('./board');

init(); // Call to run the program

/**
 * The intializing function, the program starts here
 */
function init() {
  // Grab the input, false is used for the real solution
  let input = getInput(false);
  // Format the input into a usable format
  input = splitIntoCoordPairs(input);
  // Create a gameboard with the given dimensions
  const board = new Board(...findLargest(input));
  // Add each of the input lines to the game board
  input.forEach(coordPair => {
    board.addLine(...coordPair);
  });
  // Log the answer of how many points are greater than or equal to two
  console.log(`Answer: ${board.overTwoCoords.length}`);
}


/************************/
/**  HELPER FUNCTIONS  **/
/************************/

/**
 * Reads the inputs from the desired txt file and returns an array
 * @param {boolean} isTest true if test input is desired
 * @returns {array<string>} parsed inputs from the specified input file
 */
 function getInput(isTest) {
  let testFileName = '';
  if (isTest) testFileName = '-test';
  let input = fs.readFileSync(`input${testFileName}.txt`, 'utf-8');
  // Remove any '\r' characters from windows systems
  while(input.includes('\r')) {
    input = input.replace('\r', '');
  }
  // Split it along line breaks
  input = input.split('\n');
  return input;
}

/**
 * Takes in the raw string input ["88,177 -> 566,655", "346,264 -> 872,264"]
 * and outputs a formatted 3D array of inputs e.g. [ [[88,177],[566,655]],
 * [[346,264],[872,264]] ... ]
 * @param {array<string>} input the raw string array pulled from the text file
 * @returns {array<array>} parsed input from string lines into coordinate pairs
 */
 function splitIntoCoordPairs(input) {
  return input.map(coordPair => {
    coordPair = coordPair.split(' -> ');
    coordPair = coordPair.map(coord => coord.split(','));
    return coordPair;
  });
}

/**
 * Finds the largest X and Y coordinates in the input, useful for determining
 * what size board you need to map the input
 * @param {array<array>} input 3D array of coordinate pairs
 * @returns {array} The largest X (index 0) and largest Y (index 1) coordinates
 */
 function findLargest(input) {
  // Separate the X and Y coordinates
  const justXvals = input.map(n => [n[0][0],n[1][0]]);
  const justYvals = input.map(n => [n[0][1],n[1][1]]);
  // Used to store the current maximums
  let currXmax = -1;
  let currYmax = -1;
  // Find the X max
  justXvals.forEach(pair => {
    pairMax = Math.max(...pair);
    currXmax = pairMax > currXmax ? pairMax : currXmax;
  });
  // Find the Y max
  justYvals.forEach(pair => {
    pairMax = Math.max(...pair);
    currYmax = pairMax > currYmax ? pairMax : currYmax;
  });
  return [currXmax, currYmax];
}