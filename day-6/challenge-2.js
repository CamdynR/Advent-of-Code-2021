// challenge-2.js

const fs = require('fs');

// Read in the input text, then split it by return character
let input = fs.readFileSync('input.txt', 'utf-8').split(',');
input = input.map(str => Number(str));

// The current amount of fish
const currFish = [0,0,0,0,0,0,0,0,0];

// Add the current fish counts from the input
input.forEach(fish => {
  currFish[fish] += 1;
});

/**
 * Waits the supplied number of days and creates fish accordingly
 * @param {number} numDays Number of days to wait
 * @return {number} The number of fish after numDays waited
 */
function waitNDays(numDays) {
  for (let i = 0; i < numDays; i++) {
    const newFish = currFish.shift();
    currFish.push(newFish);
    currFish[6] += newFish;
  }
  const reducer = (prev, curr) => prev + curr;
  return currFish.reduce(reducer);
}

console.log(waitNDays(256));