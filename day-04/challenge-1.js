// challenge-1.js

const fs = require('fs');
const Board = require('./board');

// Call the initializing function to run the program
init();

/**
 * The initializing function, the program starts here
 */
function init() {
  // Read in the input text, then split it by return character
  let input = fs.readFileSync('input.txt', 'utf-8').split('\n');
  // The numbers to be called for the bingo game
  const numsToCall = input.shift().split(',');
  // The list of populated boards
  const boardList = populateBoardList(input);
  // Find the winning board
  const winningBoard = findWinningBoard(boardList, numsToCall);
  // Grab the uncalled sum of the winning board and the last number called
  const unCalledSum = winningBoard.sumUncalled();
  const finalNum = winningBoard.numsCalled[winningBoard.numsCalled.length - 1];
  
  // Log the winning board and stats about it
  console.log(winningBoard);
  console.log(`This board won in ${winningBoard.numsCalled.length} numbers`);
  console.log(`Uncalled sum: ${unCalledSum}, Final num: ${finalNum}\n
  Answer: ${unCalledSum*finalNum}`);
}

/**
 * Takes in the list of input rows, creates Board objects, and populates
 * an array with them
 * @param {array<string>} input An array of rows for every game board
 * @returns {array<Board>} a populated list of every board
 */
function populateBoardList(input) {
  const boardList = []; // The boardList to populate and return
  let currBoard = new Board(); // Create a new board to start
  input.forEach(currRow => {
    // If the row's empty start a new board
    if (currRow.length == 0) {
      boardList.push(currBoard);
      currBoard = new Board();
      return;
    }
    // Split the row by spaces
    currRow = currRow.split(' ');
    // If there are any empty strings remove those
    while (currRow.includes('')) {
      currRow.splice(currRow.indexOf(''), 1);
    }
    // Coerce the strings to be numbers in the row
    currRow = currRow.map(str => Number(str));
    // Add the row to the current board
    currBoard.addRow(currRow);
  });
  return boardList;
}

/**
 * Calls each number for each board and returns the first winner
 * @param {array<Board>} boardList List of all the boards to check
 * @param {array<number>} numsToCall List of numbers to call, in order
 * @returns {Board}
 */
function findWinningBoard(boardList, numsToCall) {
  // Loop through every board
  for (let i = 0; i < numsToCall.length; i++) {
    for (let j = 0; j < boardList.length; j++) {
      // Call the new number for each board
      boardList[j].callNumber(numsToCall[i]);
      // Return if the board was a winner
      if (boardList[j].checkWinner()) return boardList[j];
    }
  }
}