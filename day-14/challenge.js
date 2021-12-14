// challenge.js

const fs = require('fs');

const real = { fileName: 'input.txt', splitChar: '\n' };
const test = { fileName: 'input-test.txt', splitChar: '\r\n' };

// Initialize the program
init();

/**
 * Initializing function, the program begins here
 */
function init() {
  challenge1();
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
  const input = parseInput(test.fileName, test.splitChar);

  let currPolymer = input.template;
  console.log(`Template:     ${input.template}`);
  for (let i = 0; i < 6; i++) {
    currPolymer = applyRules(currPolymer, input.rules);
    console.log(`After step ${i+1}: ${currPolymer}, Length: ${currPolymer.length}`);
  }

  // Measure the end time
  const endTime = new Date().getTime();
  // Log the answer
  // let answer = `Challenge 1: ${0}`;
  // answer += `, Time: ${(endTime - startTime) / 1000}s`;
  // console.log(answer);
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
  const input = fs.readFileSync(fileName, 'utf-8')
                  .split(splitChar)
                  .filter(str => str != '');
  return {
    template: input.shift(),
    rules: input.map(rule => {
      rule = rule.split(' -> ');
      return {
        pair: rule[0],
        insertion: rule[1]
      };
    })
  };
}

function applyRules(polymer, rules) {
  let toInsert = [];
  rules.forEach(rule => {
    let index = polymer.indexOf(rule.pair) + 1;
    if (index > 0) toInsert.push({ char: rule.insertion, index: index });
  });
  for (let i = 0 ; i < toInsert.length; i++) {
    let index = toInsert[i].index;
    polymer = polymer.slice(0, index) + toInsert[i].char + polymer.slice(index);
    for (let j = i+1; j < toInsert.length; j++) {
      if (j <= toInsert.length-1 && toInsert[j].index >= toInsert[i].index) {
        toInsert[j].index += 1;
      }
    }
  }
  return polymer;
}