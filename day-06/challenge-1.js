// challenge-1.js

const fs = require('fs');
const Lanternfish = require('./lanternfish');

// Read in the input text, then split it by return character
let input = fs.readFileSync('input.txt', 'utf-8').split(',');
input = input.map(str => Number(str));

// The current amount of fish
const currFish = [];

// Add all of the currently found fish to the list
input.forEach(daysLeft => {
  currFish.push(new Lanternfish(daysLeft));
});

/**
 * Waits the supplied number of days and creates fish accordingly
 * @param {number} numDays Number of days to wait
 * @return {number} The number of fish after numDays waited
 */
function waitNDays(numDays) {
  for (let i = 0; i < numDays; i++) {
    currFish.forEach(fish => {
      const isNewSpawn = fish.decreaseTimer();
      if (isNewSpawn) currFish.push(new Lanternfish(8));
    });
  }
  return currFish.length;
}

console.log(waitNDays(80));