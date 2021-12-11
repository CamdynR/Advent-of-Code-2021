// challenge.js

const fs = require('fs');

// Initialize the program
init();

/**
 * Initializing function, the program begins here
 */
function init() {
  // First Challenge
  let challenge1 = parseInput('input.txt', '\n');
  // Run the input through the step incrementer 100 times
  let numFlashes = 0;
  for (let i = 0; i < 100; i++) {
    let output = incrementStep(challenge1);
    numFlashes += output.numFlashes; // update numFlashes
    challenge1 = output.newInput; // update the new state of the input
  }
  // Log the answer
  console.log(`Challenge 1: ${numFlashes}`);

  // Second Challenge
  let challenge2 = parseInput('input.txt', '\n');
  // Run the input through the step incrementer n times until it syncs
  let numSteps = 0;
  // It's safe the assume that the input is a rectangle here
  while(countNum(challenge2, 0) != (challenge2.length * challenge2[0].length)) {
    numSteps += 1;
    challenge2 = incrementStep(challenge2).newInput;
  }
  // Log the answer
  console.log(`Challenge 2: ${numSteps}`);
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
  let input = fs.readFileSync(fileName, 'utf-8').split(splitChar);
  // Converts the array of strings to an 2D array of chars, and then to numbers
  return input.map(str => str.split('').map(num => Number(num)));
}

/**
 * Increments the given 2D array input and returns the final number of flashes
 * that occurred during the process
 * @param {array<array<number>>} input a 2D array of numbers
 * @returns {object} the input after incrementing, and the total number of flashes
 *                   that occurred during it
 */
function incrementStep(input) {
  let numFlashes = 0;
  // Add one to every number in the array
  input = input.map(row => row.map(num => num += 1));
  // do while loop, same as while loop but executes this code once first
  do {
    for (let i = 0; i < input.length; i++) {
      for (let j = 0; j < input[i].length; j++) {
        // Only the numbers greater than or equal to 10 matter
        if (input[i][j] >= 10) {
          input[i][j] = 0; // Reset them to zero
          numFlashes += 1; // Add the flash to the count
          // Increment all 8 directions (if applicable)
          // North
          if (i > 0 && input[i-1][j] != 0){
            input[i-1][j] += 1;
          }
          // North East
          if (i > 0 && j < input[i-1].length - 1 && input[i-1][j+1] != 0) {
            input[i-1][j+1] += 1;
          }
          // East
          if (j < input[i].length - 1 && input[i][j+1] != 0) {
            input[i][j+1] += 1;
          }
          // South East
          if (i < input.length - 1 && j < input[i+1].length - 1 &&input[i+1][j+1] != 0) {
            input[i+1][j+1] += 1;
          }
          // South
          if (i < input.length - 1 && input[i+1][j] != 0) {
            input[i+1][j] += 1;
          }
          // South West
          if (i < input.length - 1 &&  j > 0 && input[i+1][j-1] != 0) {
            input[i+1][j-1] += 1;
          }
          // West
          if (j > 0 && input[i][j-1] != 0) {
            input[i][j-1] += 1;
          }
          // North West
          if (i > 0 && j > 0 && input[i-1][j-1] != 0) {
            input[i-1][j-1] += 1;
          }
        }
      }
    }
  } while (countNum(input, 10));
  return {
    numFlashes: numFlashes,
    newInput: input
  };
}

/**
 * Counts the instances of the num parameter in the 2D array input. If num
 * is over 9 that digit in the input will have to be reset so this just
 * measures if it's greater than or equal to 10 an all > 9 inputs
 * @param {array<array<number>>} input a 2D array of numbers
 * @param {number} num the number to count instances of in the input
 * @returns {number} the number of zeros in the 2D array input
 */
function countNum(input, num) {
  let numZeros = 0;
  input.forEach(arr => {
    // convert to an array and filter out anything not == num
    arr = arr.filter(digit => {
      if (num < 10) {
        return digit == num;
      } else {
        // if num >= 10 then they're all the same for our this case
        return digit >= 10;
      }
    });
    // add the length (number of zeros) in this array to numZeros
    numZeros += arr.length;
  });
  return numZeros;
}