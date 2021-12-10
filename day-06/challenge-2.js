// challenge-2.js

const fs = require('fs');

// Read in the input text and create an array from it
let input = fs.readFileSync('input.txt', 'utf-8').split(',');
input = input.map(str => Number(str));

// Where the current amount of fish will be stored
const currFish = new Array(9).fill(0);
// Add the current fish counts to the empty array
input.forEach(fish => currFish[fish] += 1);

/**
 * Waits the supplied number of days and creates fish accordingly
 * @param {number} numDays Number of days to wait
 * @return {number} The number of fish after numDays waited
 */
function waitNDays(numDays) {
  for (let i = 0; i < numDays; i++) {
    // The number of babies == the number of former day 0 fish
    currFish.push(currFish.shift());
    // Since the number of babies is the same as day 0,
    // add that to day 6 to reset their counter
    currFish[6] += currFish[currFish.length - 1];
  }
  // Return the sum of all the fish
  return currFish.reduce((prev, curr) => prev + curr);
}

console.log(waitNDays(256));