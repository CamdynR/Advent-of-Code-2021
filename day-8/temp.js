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

console.log(findTwoAndThree(five, input));