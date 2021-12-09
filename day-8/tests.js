/**
 * tests.js
 * 
 * a simple scratch file for testing
 */

function findDifference(str1, str2) {
  let strDiff = {};
  strDiff[str1] = '';
  strDiff[str2] = '';
  let longer = str1.length >= str2.length ? str1 : str2;
  let shorter = str1.length < str2.length ? str1 : str2;
  for (let i = 0; i < longer.length; i++) {
    if (!shorter.includes(longer.charAt(i))) {
      strDiff[longer] += longer.charAt(i);
    }
    if (i < shorter.length && !longer.includes(shorter.charAt(i))) {
      strDiff[shorter] += shorter.charAt(i);
    }
  }
  return strDiff;
}

function findSix(input) {
  let one = input[0];
  let eight = input[9];
  let nums = input.filter(num => num.length == 6);
  for (let i = 0; i < nums.length; i++) {
    let diff = findDifference(eight, nums[i]);
    if (one.includes(diff[eight])) {
      return nums[i];
    }
  }
}

function findFive(six, input) {
  let nums = input.filter(num => num.length == 5);
  for (let i = 0; i < nums.length; i++) {
    let diff = findDifference(six, nums[i]);
    if (diff[nums[i]].length == 0 && diff[six].length == 1) {
      return nums[i];
    }
  }
}

function findTwoAndThree(five, input) {
  let twoAndThree = {};
  let nums = input.filter(num => num.length == 5);
  for (let i = 0; i < nums.length; i++) {
    let diff = findDifference(five, nums[i]);
    if (diff[nums[i]].length == 2) {
      twoAndThree['two'] = nums[i];
    } else if (diff[nums[i]].length == 1) {
      twoAndThree['three'] = nums[i];
    }
  }
  return twoAndThree;
}

function findZeroAndNine(three, six, input) {
  let zeroAndNine = {};
  let nums = input.filter(num => num.length == 6);
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] != six) {
      let diff = findDifference(three, nums[i]);
      if (diff[nums[i]].length == 2) {
        zeroAndNine['zero'] = nums[i];
      } else if (diff[nums[i]].length == 1) {
        zeroAndNine['nine'] = nums[i];
      }
    }
  }
  return zeroAndNine;
}

function populateDigits(input) {
  const digits = {};
  digits[input[0]] = 1; // 1
  digits[input[2]] = 4; // 4
  digits[input[1]] = 7; // 7
  digits[input[9]] = 8; // 8
  let six = findSix(input);
  digits[six] = 6; // 6
  let five = findFive(six, input);
  digits[five] = 5; // 5
  let twoAndThree = findTwoAndThree(five, input);
  digits[twoAndThree['two']] = 2; // 2
  digits[twoAndThree['three']] = 3; // 3
  let zeroAndNine = findZeroAndNine(twoAndThree['three'], six, input);
  digits[zeroAndNine['zero']] = 0; // 0
  digits[zeroAndNine['nine']] = 9; // 9
  return digits;
}

let input = ['ab', 'dab', 'eafb', 'gcdfa', 'fbcad', 'cdfbe',
  'cagedb', 'cefabd', 'cdfgeb', 'acedgfb'];

let zero = 'cagedb';
let one = 'ab';
let two = 'gcdfa';
let three = 'fbcad';
let four = 'eafb';
let five = 'cdfbe';
let six = 'cdfgeb';
let seven = 'dab';
let eight = 'acedgfb';
let nine = 'cefabd';

const digits = populateDigits(input);
console.log(`Checking Zero: ${digits[zero]} == 0`);
console.log(`Checking One: ${digits[one]} == 1`);
console.log(`Checking Two: ${digits[two]} == 2`);
console.log(`Checking Three: ${digits[three]} == 3`);
console.log(`Checking Four: ${digits[four]} == 4`);
console.log(`Checking Five: ${digits[five]} == 5`);
console.log(`Checking Six: ${digits[six]} == 6`);
console.log(`Checking Seven: ${digits[seven]} == 7`);
console.log(`Checking Eight: ${digits[eight]} == 8`);
console.log(`Checking Nine: ${digits[nine]} == 9`);