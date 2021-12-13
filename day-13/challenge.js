// challenge.js

const fs = require('fs');
const Transparency = require('./transparency');

const real = { fileName: 'input.txt', splitChar: '\n' };
const test = { fileName: 'input-test.txt', splitChar: '\r\n' };

// Initialize the program
init();

/**
 * Initializing function, the program begins here
 */
function init() {
  challenge1();
  challenge2();
}

/**
 * The first challenge is to take in a series of points and map them to a
 * transparency sheet, and then return how many dots are visible after one
 * fold
 */
function challenge1() {
  // Measure start time
  const startTime = new Date().getTime();
  // Grab the input from the file
  const input = parseInput(real.fileName, real.splitChar);
  // Create a transparency sheet with the input points that were parsed
  const sheet = new Transparency(input.points);
  // Fold the sheet given just the first fold
  sheet.foldSheet(input.folds[0].direction, input.folds[0].index);
  // Measure the end time
  const endTime = new Date().getTime();
  // Log the answer
  let answer = `Challenge 1: ${sheet.getVisibleDots()}`;
  answer += `, Time: ${(endTime - startTime) / 1000}s`;
  console.log(answer);
}

/**
 * The second challenge is to find what letters appear after performing every
 * fold in the input
 */
function challenge2() {
  // Measure start time
  const startTime = new Date().getTime();
  // Grab the input from the file
  const input = parseInput(real.fileName, real.splitChar);
  // Create a transparency sheet with the input points that were parsed
  const sheet = new Transparency(input.points);
  // Fold the sheet given just the first fold
  input.folds.forEach(fold => sheet.foldSheet(fold.direction, fold.index));
  // Measure the end time
  const endTime = new Date().getTime();
  console.log(`Challenge 2: Time: ${(endTime - startTime) / 1000}s`);
  // Print the sheet to find the answer
  sheet.printSheet();
}

/**
 * Grabs the inputs from input.txt, then parses them and returns the
 * points & folds
 * @param {string} filename The filename of the input to parse
 * @param {string} splitChar The character(s) to split the lines by
 * @returns {array<object>} An array of points and folds
 */
 function parseInput(fileName, splitChar) {
  // Reads in the file as a string, splits along splitChar for each line
  let input = fs.readFileSync(fileName, 'utf-8').split(splitChar);
  const points = [];
  const folds = [];
  // Separate out the points and folds
  input.forEach(line => {
    if (line.startsWith('fold along ')) {
      line = line.split('fold along ')[1].split('=');
      // Grab the direction and index of where to fold
      folds.push({ direction: line[0], index: Number(line[1]) });
    } else if (line != '') {
      line = line.split(',');
      // Grab the x and y coordinates of the point
      points.push({ x: Number(line[0]), y: Number(line[1]) });
    }
  });
  // Return the points and folds
  return {
    points: points,
    folds: folds
  };
}