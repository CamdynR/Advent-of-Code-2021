// challenge-1.js

const fs = require('fs');

// Read in the input text, then split it by return character
let input = fs.readFileSync('input.txt', 'utf-8').split('\n');

// For simple testing
// let input = ['forward 5', 'down 5', 'forward 8', 'up 3', 'down 8', 'forward 2'];

// Parse the input into a more digestable format
input = input.map(str => {
  str = str.split(' ');
  return {
    direction: str[0],
    magnitude: Number(str[1])
  }
});

// The object we'll store the submarine's positional info in
const submarine = {
  horizontal: 0,
  depth: 0
};

// Loop through each instruction and modify the sub's coordinates accordingly
input.forEach(instruction => {
  // Switch statement for the three directions
  switch(instruction.direction) {
    case 'forward':
      submarine.horizontal += instruction.magnitude;
      break;
    case 'down':
      submarine.depth += instruction.magnitude;
      break;
    case 'up':
      submarine.depth -= instruction.magnitude;
      // Submarine's can't surface higher than water level, so reset to 0 if negative
      if (submarine.depth < 0) submarine.depth = 0;
      break;
  }
});

// Log the final output
console.log(submarine);
console.log(`Answer: ${submarine.horizontal * submarine.depth}`);