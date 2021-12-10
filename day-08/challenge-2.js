// challenge-2.js

const fs = require('fs');

// Initialize the program
init();

/**
 * The initialization function, starts the entire program
 */
function init() {
  // Grab and parse the input from input.txt
  const data = parseInput('input.txt', '\n');
  // Decode the input and display the answer
  console.log(`Answer: ${decodeAndSumOutputs(data)}`);
}

/**
 * Parse the given input and return an array of objects
 * @param {string} filename the input filename
 * @param {string} splitChar the character to use to split the lines
 * @returns {array<object>} a formatted array of inputs and outputs
 */
function parseInput(filename, splitChar) {
  // Read in the input text, then split it by the return \n character
  let data = fs.readFileSync(filename, 'utf-8').split(splitChar);
  // Split data into "input" and "output" for easy parsing
  return data.map(str => {
    return {
      input: str.split(' | ')[0].split(' '),
      output: str.split(' | ')[1].split(' ')
    };
  });
}

/**
 * Decodes the given input data and returns the sum of all the decoded
 * outputs
 * @param {array<object>} data formatted data array from parseInput()
 * @returns {number} the sum of all of the decided outputs
 */
function decodeAndSumOutputs(data) {
  let outputSum = 0; // holds the sum of all of the answers
  data.forEach(entry => {
    // sort each array by string length
    entry.input = entry.input.sort((a, b) => a.length - b.length);
    // decode all of the digits from the current input
    const digits = populateDigits(entry.input);
    let outputVal = ''; // holder of decoded digits
    // Go through the ouput for each row and match up each number with the
    // decoded number value
    entry.output.forEach(num => {
      Object.keys(digits).forEach(digit => {
        // the difference between the current output num and the decoded digit
        let diff = findDifference(num, digit);
        // if there isn't a difference, it's a match, add it to outputval
        if (diff[num].length == 0 && diff[digit].length == 0) {
          outputVal += digits[digit];
        }
      });
    });
    outputSum += Number(outputVal);
  });

  // Return the final answer
  return outputSum;
}

/**
 * Creates an object with the decoded input numbers
 * @param {array<objects>} input the (sorted) inputs to decode
 * @returns {object} the decoded digits. they will be in the format
 *                   of { 'abcdefgh': 8, ... }
 */
function populateDigits(input) {
  const digits = {};
  // Decoding 1, 4, 7, and 8 are freebies (input is sorted by length)
  digits[input[0]] = 1; // 1
  digits[input[2]] = 4; // 4
  digits[input[1]] = 7; // 7
  digits[input[9]] = 8; // 8
  // You can find 6 using 8 and 1
  let six = findSix(input);
  digits[six] = 6; // 6
  // You can find 5 using 6
  let five = findFive(six, input);
  digits[five] = 5; // 5
  // You can find 2 and 3 once you've found 5
  let twoAndThree = findTwoAndThree(five, input);
  digits[twoAndThree['two']] = 2; // 2
  digits[twoAndThree['three']] = 3; // 3
  // You can find 0 and 9 using 3, and 6
  let zeroAndNine = findZeroAndNine(twoAndThree['three'], six, input);
  digits[zeroAndNine['zero']] = 0; // 0
  digits[zeroAndNine['nine']] = 9; // 9
  // Return the decoded digits
  return digits;
}

/**
 * Finds the difference between two strings
 * @param {string} str1 the first string to compare
 * @param {string} str2 the second string to compare
 * @returns {object} the letters for each string that are unique,
 *                   e.g. { 'cat': 'c', 'bat': 'b' }
 */
function findDifference(str1, str2) {
  // Create the object that will be returned
  let strDiff = {};
  strDiff[str1] = '';
  strDiff[str2] = '';
  // Find longer and shorter to avoid accessing an out of bounds
  // index of the shorter one
  let longer = str1.length >= str2.length ? str1 : str2;
  let shorter = str1.length < str2.length ? str1 : str2;
  // Loop over the longer one and compare each character from both strings
  for (let i = 0; i < longer.length; i++) {
    // Add the character to the diff string if the other doesn't have it
    if (!shorter.includes(longer.charAt(i))) {
      strDiff[longer] += longer.charAt(i);
    }
    // Add the character to the diff string if the other doesn't have it
    if (i < shorter.length && !longer.includes(shorter.charAt(i))) {
      strDiff[shorter] += shorter.charAt(i);
    }
  }
  return strDiff;
}

/**
 * Given a (sorted by length) row of encoded input, decodes and returns
 * the string value of the number 6
 * @param {array<string>} input a list of all of the encoded numbers
 * @returns {string} the value of the decoded number 6 in the array
 */
function findSix(input) {
  let one = input[0]; // the string value of one, the shortest num
  let eight = input[9]; // the string value of eight, the longest num
  let nums = input.filter(num => num.length == 6); // six is six digits long
  // Looping over all of the 6 length strings
  for (let i = 0; i < nums.length; i++) {
    let diff = findDifference(eight, nums[i]);
    // of the 3 numbers of length 6, only the number 6 will be missing digit
    // (when compared to eight) that is shared by the number 1
    if (one.includes(diff[eight])) {
      return nums[i];
    }
  }
}

/**
 * Given the decoded number six and a list of the other inputs, decodes and
 * returns the number five
 * @param {string} six the decoded value of the number six
 * @param {array<string>} input a list of all of the encoded numbers
 * @returns {string} the decoded value of the number five
 */
function findFive(six, input) {
  // retrieve only the numbers of length five
  let nums = input.filter(num => num.length == 5);
  for (let i = 0; i < nums.length; i++) {
    // find the difference between them and the number 6
    let diff = findDifference(six, nums[i]);
    // if the number 5 has no difference and the number 6 has only a single one
    // then return it
    if (diff[nums[i]].length == 0 && diff[six].length == 1) {
      return nums[i];
    }
  }
}

/**
 * Given the decoded number five and a list of the other inputs, decodes and
 * returns both the number 2 and number 3
 * @param {string} five the decoded value of the number five
 * @param {array<string>} input a list of all of the encoded numbers
 * @returns {object} the decoded numbers 2 and 3, in the format
 *                   { 'two': 'someValue', 'three': 'otherValue' }
 */
function findTwoAndThree(five, input) {
  // object to store the final two and three values
  let twoAndThree = {};
  // retrieve only the numbers of length five
  let nums = input.filter(num => num.length == 5);
  for (let i = 0; i < nums.length; i++) {
    // find the difference between five and the current number
    let diff = findDifference(five, nums[i]);
    // if the difference is 2 letters, it must be the number 2
    if (diff[nums[i]].length == 2) {
      twoAndThree['two'] = nums[i];
    // if the difference is 1 letter, it must be the number 3
    } else if (diff[nums[i]].length == 1) {
      twoAndThree['three'] = nums[i];
    }
  }
  return twoAndThree;
}

/**
 * Given the decoded numbers three and six, as well as a list of the other
 * inputs, decodes and returns both the number 2 and number 3
 * @param {string} three the decoded number three
 * @param {string} six the decoded number six
 * @param {array<string>} input a list of all of the encoded numbers
 * @returns {object} the decoded numbers 0 and 9, in the format
 *                   { 'zero': 'someValue', 'nine': 'otherValue' }
 */
function findZeroAndNine(three, six, input) {
  // object to store the final zero and nine values
  let zeroAndNine = {};
  // retrieve only the numbers of length six
  let nums = input.filter(num => num.length == 6);
  for (let i = 0; i < nums.length; i++) {
    // make sure the current number isn't six
    if (nums[i] != six) {
      // find the difference between three and the current number
      let diff = findDifference(three, nums[i]);
      // if the difference is of length 2 it must be zero
      if (diff[nums[i]].length == 2) {
        zeroAndNine['zero'] = nums[i];
      // if the difference is of length 1 it must be nine
      } else if (diff[nums[i]].length == 1) {
        zeroAndNine['nine'] = nums[i];
      }
    }
  }
  return zeroAndNine;
}