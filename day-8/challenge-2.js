// challenge-2.js

const fs = require('fs');

const uniqueLengths = [2,3,4,7];

// Read in the input text, then split it by the comma character
let data = fs.readFileSync('input-test.txt', 'utf-8').split('\r\n');
data = data.map(str => {
  return {
    input: str.split(' | ')[0].split(' '),
    output: str.split(' | ')[1].split(' ')
  };
});

data.forEach(entry => {
  entry.input = entry.input.sort((a,b) => a.length - b.length);
  const digits = {};
  digits[entry.input[0]] = 1;
  digits[entry.input[2]] = 4;
  digits[entry.input[1]] = 7;
  digits[entry.input[9]] = 8;
  let six = findSix(entry.input);
  digits[six] = 6;
  let five = findFive(digits[six], input);
  digits[five] = 5;
  let twoAndThree = findTwoAndThree(digits[five], input);
  digits[two] = twoAndThree['two'];
  digits[three] = twoAndThree['three'];
});

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

function findFive(six, input) {
  let nums = input.filter(num => num.length == 5);
  for (let i = 0; i < nums.length; i++) {
    let diff = findDifference(six, nums[i]);
    if (diff[nums[i]].length == 0 && diff[six].length == 1) {
      return nums[i];
    }
  }
}

function findSix(input) {
  let one = entry.input[0];
  let eight = entry.input[10];
  let nums = input.filter(num => num.length == 6);
  for (let i = 0; i < nums.length; i++) {
    let diff = findDifference(eight, nums[i]);
    if (one.includes(diff[eight])) {
      return nums[i];
    }
  }
}

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

console.log(data);

// let sumOutputs = 0;
// console.log(`Answer: ${sumOutputs}`);