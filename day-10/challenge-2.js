// challenge-2.js

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
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4
};
// An array of all of the open symbols (e.g. (, [ ...) for easy reference
const openSymbols = Object.keys(pairs);

// Initialize the program
init();

/**
 * Initializing function, the program begins here
 */
function init() {
  let input = parseInput('input.txt', '\n');
  // Filter out rows that contain illegal characters
  input = filterIllegalRows(input);
  // Find the completion strings for each of the legal rows
  let rowCompletions = getRowCompletion(input);
  // Find the score for each of the completion strings
  let finalVals = findCompletionValues(rowCompletions);
  // Grab the middle score in the sorted array of final scores
  let middleNum = finalVals[Math.floor(finalVals.length / 2)];
  // Log the answer
  console.log(`Answer: ${middleNum}`);
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
 * Removes any row that contains an illegal character (premature closing char)
 * @param {array<string>} input array of strings to check for illegal characters
 * @returns {array<string>} the new input with the illegal rows filtered out
 */
function filterIllegalRows(input) {
  return input.filter(line => {
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
        if (currChar != charToCheck) {
          // Return false to filter out this row
          return false;
        }
      }
    }
    // If no illegal characters are hit, return true to keep the row
    return true;
  });
}

/**
 * Takes in partially completed rows and returns an array of strings
 * that would complete those rows
 * @param {array<string>} input an array of partially completed strings
 * @returns {array<string>} an array of characters that would complete each row
 */
function getRowCompletion(input) {
  let completionStrings = [];
  input.forEach(line => {
    const openQueue = [];
    for (let i = 0; i < line.length; i++) {
      let currChar = line[i];
      if (openSymbols.includes(currChar)) {
        openQueue.push(currChar);
      } else {
        // No need to check since these are legal rows, simply pop the most
        // recent opening character off the end of the array
        openQueue.pop();
      }
    }
    // Grab the complements of what's left in the queue and reverse it
    let newCompletionStr = openQueue.map(char => pairs[char]).reverse();
    // Add this to our array
    completionStrings.push(newCompletionStr);
  });
  return completionStrings;
}

/**
 * Takes an array of completion strings (found from the input rows) and
 * calculates a score for them
 * @param {array<string>} completions the completion strings to find a score for
 * @returns {array<number>} a sorted array of all of the scores values for
 *                          each of the given completion strings
 */
function findCompletionValues(completions) {
  let finalValues = [];
  completions.forEach(completion => {
    // Convert each character into the point value for it
    completion = completion.map(char => points[char]);
    // Calculate the score for all of the characters in the array
    completion = completion.reduce((a,b) => (a*5) + b);
    // Add this score to the final array
    finalValues.push(completion);
  });
  // Sort the array in ascending order
  finalValues = finalValues.sort((a,b) => a-b);
  return finalValues;
}