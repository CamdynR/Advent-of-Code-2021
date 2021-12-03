// challenge-2.js

const fs = require('fs');

// For simple testing
let testInput = ['00100', '11110', '10110', '10111', '10101', '01111', '00111', '11100', '10000', '11001', '00010', '01010'];

/**
 * Finds the binary number value for either the oxygen generator rating or c02 scrubber rating
 * based on the description given in the problem
 * @param {string} bitCriteria Accepts 'oxygen' or 'c02' depending on which you are searching for
 * @param {array} list The remaining list of numbers which haven't been trimmed
 * @param {number} index The current index inside each binary number that is being compared
 * @returns {string or array} If an answer is found, this function will return the answer as a
 *                            string. Otherwise, it will return all of the remaining answers as
 *                            an array.
 */
function bitCriteriaRating(bitCriteria, list, index) {
  // If the list is of length 1, then that must be the answer
  if (list.length == 1) return list[0];
  // We cannot go farther than the length of the binary numbers, so we must return here
  if (index == list[0].length) return list;

  // Create the empty arrays where we'll store the counts
  let values = [[], []];
  for (let i = 0; i < list[0].length; i++) {
    values[0].push(0);
    values[1].push(0);
  }

  // Populate the empty arrays with the accurate counts
  list.forEach(item => {
    for (let i = 0; i < item.length; i++) {
      values[item.charAt(i)][i] += 1;
    }
  });
  
  // The new list we'll be trimming our items from the list array into
  let newList = [];

  // Based on the current bit position, add each binary number to the list if they pass
  list.forEach(item => {
    let currChar = item.charAt(index);
    // 1 is more popular
    if (values[1][index] >= values[0][index]) {
      if (currChar == 1 && bitCriteria == 'oxygen') {
        newList.push(item);
      } else if (currChar == 0 && bitCriteria == 'c02') {
        newList.push(item);
      }
    // 0 is more popular
    } else {
      if (currChar == 0 && bitCriteria == 'oxygen') {
        newList.push(item);
      } else if (currChar == 1 && bitCriteria == 'c02') {
        newList.push(item);
      }
    }
  });

  // Recursively search with the trimmed list and the next index
  return bitCriteriaRating(bitCriteria, newList, index + 1);
}

// Gather the input from the text file
let input = fs.readFileSync('input.txt', 'utf-8').split('\n');
// Get the final readings for Oxygen and C02
let oxygenGen = bitCriteriaRating('oxygen', input, 0);
let c02Scrub = bitCriteriaRating('c02', input, 0);

console.log(`Oxygen Generator - Binary: ${oxygenGen}, Decimal: ${parseInt(oxygenGen, 2)}`);
console.log(`C02 Scrubber ${c02Scrub}, Decimal: ${parseInt(c02Scrub, 2)}`);
console.log(`Final Answer (Decimal): ${parseInt(oxygenGen, 2) * parseInt(c02Scrub, 2)}`);